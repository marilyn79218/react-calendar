import * as React from 'react';
import type Moment from 'moment';

import { WEEK_LABELS } from '../../../../shared/constants';
import CalendarDate from './CalendarDate';
import styles from './Month.m.css';

type Props = {
  dates: Array<Moment>,
  baseDate: Moment,
  setBaseDate: Moment => any,
  setIsCalendarOpen: boolean => any,
};

const Month = ({
  dates,
  baseDate,
  setBaseDate,
  setIsCalendarOpen,
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
          baseDate={baseDate}
          setBaseDate={setBaseDate}
          date={date}
          setIsCalendarOpen={setIsCalendarOpen}
        />
      ))
    }
  </section>
);

export default Month;
