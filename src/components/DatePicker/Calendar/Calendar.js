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

import styles from './Calendar.m.css';

type Props = {
  month: number,
  year: number,
  dates: Array<Moment>,
  selectedDate: Moment,
  setSelectedDate: Moment => any,
  updateMonth: string => any,
  displayMode: string,
  getTextClickHandler: string => any,
  getPanelClickHandler: string => any,
  getComponent: () => React.Node,
};

const Calendar = ({
  month,
  year,
  updateMonth,
  displayMode,
  getTextClickHandler,
  getComponent,
}: Props) => {
  console.log(' Calendar - month', month);
  console.log(' Calendar - year', year);

  return (
    <section
      className={styles.container}
    >
      <CalendarHeader
        month={month}
        year={year}
        updateMonth={updateMonth}
        textClickHandler={getTextClickHandler(displayMode)}
        displayMode={displayMode}
      />
      {
        getComponent(displayMode)
      }
    </section>
  );
};

const hoc = compose(
  withState('displayMode', 'setDisplayMode', DISPLAY_MODES[0]),
  withHandlers({
    getTextClickHandler: props => (currentMode) => {
      const {
        setDisplayMode,
      } = props;

      return () => {
        setDisplayMode(MODE_INTERACTIVE[currentMode].nextMode);
      };
    },
    getPanelClickHandler: props => currentMode => (targetYear, targetMonth) => {
      const {
        setDisplayMode,
        updateMonth,
      } = props;

      return () => {
        setDisplayMode(MODE_INTERACTIVE[currentMode].prevMode);
        updateMonth(targetYear, targetMonth);
      };
    },
  }),
  withHandlers({
    getComponent: ({
      selectedDate,
      setSelectedDate,
      month,
      year,
      dates,
      getPanelClickHandler,
    }: Props) => (currentMode) => {
      switch (currentMode) {
        case DISPLAY_MODES[1]: {
          return (
            <React.Fragment>
              Mode { DISPLAY_MODES[1] }
              <MonthPanel
                year={year}
                panelClickHandler={getPanelClickHandler(currentMode)}
              />
            </React.Fragment>
          );
        }
        case DISPLAY_MODES[2]: {
          return (
            <div>
              Mode { DISPLAY_MODES[2] }
            </div>
          );
        }
        default: {
          return (
            <Month
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              month={month}
              dates={dates}
            />
          );
        }
      }
    },
  }),
);

export default hoc(Calendar);
