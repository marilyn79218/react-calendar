import * as React from 'react';
import type Moment from 'moment';

import {
  compose,
  withState,
  withHandlers,
} from 'recompose';

import {
  DISPLAY_MODES,
  MODE_INTERACTIVE,
} from '../../../shared/constants';
import CalendarHeader from './CalendarHeader';
import Month from './Month';
import MonthPanel from './MonthPanel';
import YearPanel from './YearPanel';

import styles from './Calendar.m.css';

type Props = {
  year: number,
  dates: Array<Moment>,
  baseDate: Moment,
  setBaseDate: Moment => any,
  headerArrowHandler: string => any,
  displayMode: string,
  getTextClickHandler: string => any,
  getPanelClickHandler: string => any,
  getComponent: () => React.Node,
};

const Calendar = ({
  baseDate,
  displayMode,
  getTextClickHandler,
  headerArrowHandler,
  getComponent,
}: Props) => (
  <section
    className={styles.container}
  >
    <CalendarHeader
      baseDate={baseDate}
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
        updateBaseDate,
      } = props;

      return () => {
        setDisplayMode(MODE_INTERACTIVE[currentMode].prevMode);
        updateBaseDate(targetYear, targetMonth, 1);
      };
    },
  }),
  withHandlers({
    headerArrowHandler: props => currentMode => (direction = 'next') => {
      const {
        baseDate,
        updateBaseDate,
      } = props;
      const dateValue = baseDate.date();
      const baseMonth = baseDate.month();
      const baseYear = baseDate.year();

      switch (currentMode) {
        case DISPLAY_MODES[1]: {
          return () => {
            updateBaseDate(baseYear, direction === 'next' ? baseMonth + 1 : baseMonth - 1);
          };
        }
        case DISPLAY_MODES[2]: {
          return () => {
            updateBaseDate(direction === 'next' ? baseYear + 1 : baseYear - 1);
          };
        }
        default: {
          return () => {
            updateBaseDate(baseYear, baseMonth, direction === 'next' ? dateValue + 1 : dateValue - 1);
          };
        }
      }
    },
    getComponent: ({
      baseDate,
      setBaseDate,
      dates,
      getPanelClickHandler,
    }: Props) => (currentMode) => {
      switch (currentMode) {
        case DISPLAY_MODES[1]: {
          return (
            <MonthPanel
              baseDate={baseDate}
              panelClickHandler={getPanelClickHandler(currentMode)}
            />
          );
        }
        case DISPLAY_MODES[2]: {
          return (
            <YearPanel
              baseDate={baseDate}
              panelClickHandler={getPanelClickHandler(currentMode)}
            />
          );
        }
        default: {
          return (
            <Month
              baseDate={baseDate}
              setBaseDate={setBaseDate}
              dates={dates}
            />
          );
        }
      }
    },
  }),
);

export default hoc(Calendar);
