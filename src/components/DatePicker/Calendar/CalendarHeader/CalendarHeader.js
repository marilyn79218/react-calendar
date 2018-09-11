import * as React from 'react';
import {
  compose,
  withProps,
} from 'recompose';

import { DISPLAY_MODES } from '../../../../shared/constants';
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
      &laquo;
    </button>
    <div
      onClick={textClickHandler}
    >
      { headerText }
    </div>
    <button
      onClick={headerArrowHandler('next')}
    >
      &raquo;
    </button>
  </header>
);

const hoc = compose(
  withProps(
    ({ year }) => {
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
      displayMode,
      month,
      year,
      availableYears,
    }) => {
      switch (displayMode) {
        case DISPLAY_MODES[1]: return ({
          headerText: `${year}`,
        });
        case DISPLAY_MODES[2]: return ({
          headerText: `${availableYears[0]}-${availableYears[availableYears.length - 1]}`,
        });
        default: return ({
          headerText: `${month + 1} & ${year}`,
        });
      }
    },
  ),
);

export default hoc(CalendarHeader);
