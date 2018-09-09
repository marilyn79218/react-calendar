import * as React from 'react';
import type Moment from 'moment';

import CalendarDate from './CalendarDate';
import styles from './Month.m.css';

type Props = {
  today: Moment,
  month: number,
  dates: Array<Moment>,
  selectedDate: Moment,
};

const WEEK_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Month = ({
  today,
  month,
  dates,
  selectedDate,
}: Props) => {
  console.log('   Month', dates);

  return (
    <section
      className={styles['month-container']}
    >
      {
        WEEK_LABELS.map(weekLabel => (
          <p>{ weekLabel }</p>
        ))
      }
      {
        dates.map(date => (
          <CalendarDate
            today={today}
            selectedDate={selectedDate}
            date={date}
            month={month}
          />
        ))
      }
    </section>
  );
};

export default Month;
