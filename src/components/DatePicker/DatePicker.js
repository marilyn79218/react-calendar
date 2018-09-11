// @flow
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
  ROW_COUNTS,
  WEEKDAYS_COUNTS,
} from '../../shared/constants';
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
  setBaseDate: Moment => any,
  isCalendarOpen: boolean,
  setIsCalendarOpen: boolean => any,
  updateMonth: string => any,
};

const today = moment();

const DatePicker = ({
  baseDate,
  month,
  year,
  setBaseDate,
  isCalendarOpen,
  setIsCalendarOpen,
  updateMonth,
}: Props) => {
  const getAllDates = () => {
    const firstDate = moment([year, month]).weekday(0);
    const allDates = [...new Array(WEEKDAYS_COUNTS * ROW_COUNTS)].map((ele, index) => firstDate.clone().add(index, 'd'));

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
            baseDate={baseDate}
            setBaseDate={setBaseDate}
            month={month}
            year={year}
            dates={getAllDates()}
            updateMonth={updateMonth}
          />
        ) : null
      }
    </React.Fragment>
  );
};

const hoc = compose(
  withState('baseDate', 'setBaseDate', today),
  withState('isCalendarOpen', 'setIsCalendarOpen', false),
  withProps(
    ({ baseDate }) => ({
      month: baseDate.month(),
      year: baseDate.year(),
    }),
  ),
  withHandlers({
    updateMonth: props => (targetYear, targetMonth) => {
      const {
        setBaseDate,
      } = props;

      const firstDate = moment().year(targetYear).month(targetMonth).date(1);
      setBaseDate(firstDate);
    },
  }),
);

export default hoc(DatePicker);
