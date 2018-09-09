// @flow
import * as React from 'react';
import moment from 'moment';
import type Moment from 'moment';

import {
  compose,
  withState,
  withProps,
  // withHandlers,
} from 'recompose';

import Calendar from './Calendar';

type Props = {
  // children?: React.Node,
  // style?: {},
  // onClick?: (e: SyntheticEvent<>) => mixed,
  // disabled?: boolean,
  // id?: string,
  baseDate: Moment,
  month: number,
  year: number,
  dates: Array<Moment>,
  selectedDate: Moment,
  setSelectedDate: Moment => any,
  isCalendarOpen: boolean,
  setIsCalendarOpen: boolean => any,
};

const today = moment();

const DatePicker = ({
  baseDate,
  month,
  year,
  selectedDate,
  setSelectedDate,
  isCalendarOpen,
  setIsCalendarOpen,
}: Props) => {
  const getAllDates = () => {
    const firstDate = moment([year, month]).weekday(0);
    const allDates = [...new Array(7 * 6)].map((ele, index) => firstDate.clone().add(index, 'd'));

    return allDates;
  };

  return (
    <React.Fragment>
      <input
        type="text"
        value={baseDate.format('MM/DD/YYYY')}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      />
      {
        isCalendarOpen ? (
          <Calendar
            today={today}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            month={month}
            year={year}
            dates={getAllDates()}
          />
        ) : null
      }
    </React.Fragment>
  );
};

const hoc = compose(
  withState('baseDate', 'setBaseDate', today),
  withState('selectedDate', 'setSelectedDate', today),
  withState('isCalendarOpen', 'setIsCalendarOpen', false),
  withProps(
    ({ baseDate }) => ({
      month: baseDate.month(),
      year: baseDate.year(),
    }),
  ),
);

export default hoc(DatePicker);
