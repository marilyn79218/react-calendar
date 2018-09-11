import * as React from 'react';
import type Moment from 'moment';

import { WEEK_LABELS } from '../../../../shared/constants';
import CalendarDate from './CalendarDate';
import styles from './Month.m.css';

type Props = {
  month: number,
  dates: Array<Moment>,
  selectedDate: Moment,
  setSelectedDate: Moment => any,
};

const Month = ({
  month,
  dates,
  selectedDate,
  setSelectedDate,
}: Props) => (
  <section
    className={styles['month-container']}
  >
    {
      WEEK_LABELS.map(weekLabel => (
        <p
          key={weekLabel}
        >{ weekLabel }</p>
      ))
    }
    {
      dates.map(date => (
        <CalendarDate
          key={JSON.stringify(date)}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          date={date}
          month={month}
        />
      ))
    }
  </section>
);

export default Month;
