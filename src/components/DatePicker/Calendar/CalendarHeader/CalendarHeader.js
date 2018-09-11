import * as React from 'react';
import {
  compose,
  withProps,
} from 'recompose';

import {
  DISPLAY_MODES,
  MONTH_LABELS,
} from '../../../../shared/constants';
import styles from './CalendarHeader.m.css';

type Props = {
  headerArrowHandler: string => any,
  textClickHandler: () => any,
  headerText: string,
};

const CalendarHeader = ({
  textClickHandler,
  headerArrowHandler,
  headerText,
}: Props) => (
  <header
    className={styles['header-container']}
  >
    <button
      onClick={headerArrowHandler('prev')}
    >
      &lt;
    </button>
    <div
      className={styles['text-area']}
      onClick={textClickHandler}
    >
      { headerText }
    </div>
    <button
      onClick={headerArrowHandler('next')}
    >
      &gt;
    </button>
  </header>
);

const hoc = compose(
  withProps(
    ({ baseDate }) => {
      const year = baseDate.year();
      const floorYear = Math.floor(year / 10) * 10;
      const availableYears = [...Array(10)].map((ele, index) => floorYear + index);
      const allYears = [(floorYear - 1), ...availableYears, (floorYear + 10)];

      return ({
        allYears,
        availableYears,
      });
    },
  ),
  withProps(
    ({
      baseDate,
      displayMode,
      availableYears,
    }) => {
      const month = baseDate.month();
      const year = baseDate.year();

      switch (displayMode) {
        case DISPLAY_MODES[1]: return ({
          headerText: `${year}`,
        });
        case DISPLAY_MODES[2]: return ({
          headerText: `${availableYears[0]}-${availableYears[availableYears.length - 1]}`,
        });
        default: {
          const monthLabel = MONTH_LABELS.find(monthObj => monthObj.value === month).label;

          return ({
            headerText: `${monthLabel} ${year}`,
          });
        }
      }
    },
  ),
);

export default hoc(CalendarHeader);
