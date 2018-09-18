import * as React from 'react';
import moment from 'moment';
import type Moment from 'moment';

import {
  compose,
  withState,
  withProps,
  withHandlers,
} from 'recompose';

import {
  DISPLAY_MODES,
  MODE_INTERACTIVE,
  ROW_COUNTS,
  WEEKDAYS_COUNTS,
} from '../../../shared/constants';
import CalendarHeader from './CalendarHeader';
import Month from './Month';
import MonthPanel from './MonthPanel';
import YearPanel from './YearPanel';

import styles from './Calendar.m.css';

type Props = {
  year: number,
  dates: Array<Moment>,
  date: Moment,
  onSelect: Moment => any,
  headerArrowHandler: string => any,
  displayMode: string,
  getTextClickHandler: string => any,
  getPanelClickHandler: string => any,
  getComponent: () => React.Node,
  setIsCalendarOpen: boolean => any,
};

const Calendar = ({
  date,
  displayMode,
  getTextClickHandler,
  headerArrowHandler,
  getComponent,
}: Props) => (
  <section
    className={styles.container}
  >
    <CalendarHeader
      baseDate={date}
      headerArrowHandler={headerArrowHandler(displayMode)}
      textClickHandler={getTextClickHandler(displayMode)}
      displayMode={displayMode}
    />
    {
      getComponent(displayMode)
    }
  </section>
);

const hoc = compose(
  withState('displayMode', 'setDisplayMode', DISPLAY_MODES[0]),
  withHandlers({
    getTextClickHandler: props => (currentMode) => {
      const {
        setDisplayMode,
      } = props;

      const nextMode = MODE_INTERACTIVE[currentMode].nextMode;
      return () => {
        if (nextMode) {
          setDisplayMode(nextMode);
        }
      };
    },
    getPanelClickHandler: props => currentMode => (targetYear, targetMonth = 0) => {
      const {
        setDisplayMode,
        panelUpdateBaseDate,
      } = props;

      return () => {
        setDisplayMode(MODE_INTERACTIVE[currentMode].prevMode);
        panelUpdateBaseDate(targetYear, targetMonth, 1);
      };
    },
  }),
  withProps(
    ({ date }) => {
      const month = date.month();
      const year = date.year();
      const firstDate = moment([year, month]).weekday(0);
      const allDates = [...new Array(WEEKDAYS_COUNTS * ROW_COUNTS)].map((ele, index) => firstDate.clone().add(index, 'd'));

      return {
        dates: allDates,
      };
    },
  ),
  withHandlers({
    headerArrowHandler: props => currentMode => (direction = 'next') => {
      const {
        date,
        panelUpdateBaseDate,
      } = props;
      const dateValue = date.date();
      const baseMonth = date.month();
      const baseYear = date.year();

      switch (currentMode) {
        case DISPLAY_MODES[1]: {
          return () => {
            panelUpdateBaseDate(baseYear, direction === 'next' ? baseMonth + 1 : baseMonth - 1);
          };
        }
        case DISPLAY_MODES[2]: {
          return () => {
            panelUpdateBaseDate(direction === 'next' ? baseYear + 1 : baseYear - 1);
          };
        }
        default: {
          return () => {
            panelUpdateBaseDate(baseYear, baseMonth, direction === 'next' ? dateValue + 1 : dateValue - 1);
          };
        }
      }
    },
    getComponent: ({
      date,
      onSelect,
      dates,
      getPanelClickHandler,
      setIsCalendarOpen,
    }: Props) => (currentMode) => {
      switch (currentMode) {
        case DISPLAY_MODES[1]: {
          return (
            <MonthPanel
              baseDate={date}
              panelClickHandler={getPanelClickHandler(currentMode)}
            />
          );
        }
        case DISPLAY_MODES[2]: {
          return (
            <YearPanel
              baseDate={date}
              panelClickHandler={getPanelClickHandler(currentMode)}
            />
          );
        }
        default: {
          return (
            <Month
              baseDate={date}
              updateBaseDate={onSelect}
              dates={dates}
              setIsCalendarOpen={setIsCalendarOpen}
            />
          );
        }
      }
    },
  }),
);

export default hoc(Calendar);
