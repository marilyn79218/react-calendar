import * as React from 'react';
import type Moment from 'moment';
import classnames from 'classnames';
import {
  compose,
  withHandlers,
} from 'recompose';
import {
  equals,
} from 'ramda';

import styles from './CalendarDate.m.css';

type Props = {
  today: Moment,
  month: number,
  date: Moment,
  isSameDay: (Moment, Moment) => boolean,
  isSelectedDate: Moment => boolean,
};

const CalendarDate = ({
  today,
  month,
  date,
  isSameDay,
  isSelectedDate,
}: Props) => {
  console.log('month', month);
  console.log('date month', date.month());

  return (
    <p
      className={
        classnames({
          [styles['current-day']]: isSameDay(date, today),
          [styles['selected-day']]: isSelectedDate(date),
          [styles.future]: date.month() > month,
          [styles.past]: date.month() < month,
        })
      }
    >
      { date.date() }
    </p>
  );
};

const hoc = compose(
  withHandlers({
    isSameDay: () => (date1, date2) => (
      equals(date1.year(), date2.year()) &&
      equals(date1.month(), date2.month()) &&
      equals(date1.date(), date2.date())
    ),
  }),
  withHandlers({
    isSelectedDate: props => (date) => {
      const {
        isSameDay,
        selectedDate,
      } = props;

      return isSameDay(date, selectedDate);
    },
  }),
);

export default hoc(CalendarDate);
