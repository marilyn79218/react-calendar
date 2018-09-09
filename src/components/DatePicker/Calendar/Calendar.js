import * as React from 'react';
// import moment from 'moment';
import type Moment from 'moment';

// import {
//   compose,
//   withState,
// } from 'recompose';

import CalendarHeader from './CalendarHeader';
import Month from './Month';

import styles from './Calendar.m.css';

type Props = {
  today: Moment,
  month: number,
  year: number,
  dates: Array<Moment>,
  selectedDate: Moment,
};

const Calendar = ({
  today,
  month,
  year,
  dates,
  selectedDate,
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
      />
      <Month
        today={today}
        selectedDate={selectedDate}
        month={month}
        dates={dates}
      />
    </section>
  );
};

export default Calendar;
