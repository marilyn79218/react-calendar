// @flow
import * as React from 'react';
import moment from 'moment';
import type Moment from 'moment';
import {
  compose,
  withState,
  withHandlers,
} from 'recompose';

import {
  DATE_FORMAT,
  ROW_COUNTS,
  WEEKDAYS_COUNTS,
} from '../../shared/constants';
import Calendar from './Calendar';

type Props = {
  baseDate: Moment,
  dates: Array<Moment>,
  setBaseDate: Moment => any,
  isCalendarOpen: boolean,
  setIsCalendarOpen: boolean => any,
  updateBaseDate: string => any,
};

const today = moment();

const DatePicker = ({
  baseDate,
  setBaseDate,
  isCalendarOpen,
  setIsCalendarOpen,
  updateBaseDate,
}: Props) => {
  const month = baseDate.month();
  const year = baseDate.year();
  const getAllDates = () => {
    const firstDate = moment([year, month]).weekday(0);
    const allDates = [...new Array(WEEKDAYS_COUNTS * ROW_COUNTS)].map((ele, index) => firstDate.clone().add(index, 'd'));

    return allDates;
  };

  return (
    <React.Fragment>
      <input
        type="text"
        value={baseDate.format(DATE_FORMAT)}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      />
      {
        isCalendarOpen ? (
          <Calendar
            baseDate={baseDate}
            setBaseDate={setBaseDate}
            dates={getAllDates()}
            updateBaseDate={updateBaseDate}
            setIsCalendarOpen={setIsCalendarOpen}
          />
        ) : null
      }
    </React.Fragment>
  );
};

const hoc = compose(
  withState('baseDate', 'setBaseDate', today),
  withState('isCalendarOpen', 'setIsCalendarOpen', false),
  withHandlers({
    updateBaseDate: props => (targetYear, targetMonth = 0, targetDate = 1) => {
      const {
        setBaseDate,
      } = props;

      const firstDate = moment().year(targetYear).month(targetMonth).date(targetDate);
      setBaseDate(firstDate);
    },
  }),
);

export default hoc(DatePicker);
