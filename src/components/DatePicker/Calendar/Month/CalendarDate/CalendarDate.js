import * as React from 'react';
import moment from 'moment';
import type Moment from 'moment';
import classnames from 'classnames';
import {
  compose,
  withProps,
  withHandlers,
} from 'recompose';
import {
  equals,
} from 'ramda';

import styles from './CalendarDate.m.css';

const TODAY = moment();

type Props = {
  baseMonth: number,
  date: Moment,
  isSameDay: (Moment, Moment) => boolean,
  isSelectedDate: Moment => boolean,
  updateBaseDate: Moment => any,
  setIsCalendarOpen: boolean => any,
};

const CalendarDate = ({
  baseMonth,
  date,
  isSameDay,
  isSelectedDate,
  updateBaseDate,
  setIsCalendarOpen,
}: Props) => (
  <div
    className={
      classnames({
        [styles['current-day']]: isSameDay(date, TODAY),
        [styles['selected-day']]: isSelectedDate(date),
        [styles.future]: date.month() > baseMonth,
        [styles.past]: date.month() < baseMonth,
      })
    }
    onClick={() => {
      updateBaseDate(date);
      setIsCalendarOpen(false);
    }}
  >
    { date.date() }
  </div>
);

const hoc = compose(
  withProps(
    ({ baseDate }) => ({
      baseMonth: baseDate.month(),
    }),
  ),
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
        baseDate,
      } = props;

      return isSameDay(date, baseDate);
    },
  }),
);

export default hoc(CalendarDate);
