import * as React from 'react';

import styles from './CalendarHeader.m.css';

type Props = {
  month: number,
  year: number,
  updateMonth: string => any,
};

const CalendarHeader = ({
  month,
  year,
  updateMonth,
}: Props) => (
  <header
    className={styles['header-container']}
  >
    <button
      onClick={() => updateMonth('prev')}
    >
      &laquo;
    </button>
    <h3>
      { month + 1 } & { year }
    </h3>
    <button
      onClick={() => updateMonth('next')}
    >
      &raquo;
    </button>
  </header>
);

export default CalendarHeader;
