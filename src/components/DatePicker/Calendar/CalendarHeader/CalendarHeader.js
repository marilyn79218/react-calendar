import * as React from 'react';

import styles from './CalendarHeader.m.css';

type Props = {
  month: number,
  year: number,
};

const CalendarHeader = ({
  month,
  year,
}: Props) => (
  <header
    className={styles['header-container']}
  >
    <button>
      &laquo;
    </button>
    <h3>
      { month + 1 } & { year }
    </h3>
    <button>
      &raquo;
    </button>
  </header>
);

export default CalendarHeader;
