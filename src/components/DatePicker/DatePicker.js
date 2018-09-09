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
  date: Moment,
  month: number,
  year: number,
  dates: Array<Moment>,
  isCalendarOpen: boolean,
  setIsCalendarOpen: boolean => any,
};

const today = moment();

const DatePicker = ({
  date,
  month,
  year,
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
        value={date.format('MM/DD/YYYY')}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      />
      {
        isCalendarOpen ? (
          <Calendar
            month={month + 1}
            year={year}
            dates={getAllDates()}
          />
        ) : null
      }
    </React.Fragment>
  );
};

const hoc = compose(
  withState('date', 'setDate', today),
  withState('isCalendarOpen', 'setIsCalendarOpen', false),
  withProps(
    ({ date }) => ({
      month: date.month(),
      year: date.year(),
    }),
  ),
);

export default hoc(DatePicker);
