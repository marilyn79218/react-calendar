import * as React from 'react';
import type Moment from 'moment';

import CalendarDate from './CalendarDate';
import styles from './Month.m.css';

type Props = {
  dates: Array<Moment>,
};

const WEEK_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Month = ({
  dates,
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
            date={date}
          />
        ))
      }
    </section>
  );
};

export default Month;
