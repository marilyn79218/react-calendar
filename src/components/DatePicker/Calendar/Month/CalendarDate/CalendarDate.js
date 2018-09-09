import * as React from 'react';
import type Moment from 'moment';

// import styles from './CalendarDate.m.css';

type Props = {
  date: Moment,
};

const CalendarDate = ({
  date,
}: Props) => (
  <p>
    { date.date() }
  </p>
);

export default CalendarDate;
