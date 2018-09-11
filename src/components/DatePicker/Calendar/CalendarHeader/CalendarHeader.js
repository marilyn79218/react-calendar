import * as React from 'react';
import {
  compose,
  withProps,
} from 'recompose';

import { DISPLAY_MODES } from '../../../../shared/constants';
import styles from './CalendarHeader.m.css';

type Props = {
  month: number,
  year: number,
  updateMonth: string => any,
  textClickHandler: () => any,
  headerText: string,
};

const CalendarHeader = ({
  month,
  year,
  updateMonth,
  textClickHandler,
  headerText,
}: Props) => (
  <header
    className={styles['header-container']}
  >
    <button
      onClick={() => updateMonth(year, month - 1)}
    >
      &laquo;
    </button>
    <div
      onClick={textClickHandler}
    >
      { headerText }
    </div>
    <button
      onClick={() => updateMonth(year, month + 1)}
    >
      &raquo;
    </button>
  </header>
);

const hoc = compose(
  withProps(
    ({
      displayMode,
      month,
      year,
    }) => {
      switch (displayMode) {
        case DISPLAY_MODES[1]: return ({
          headerText: `${year}`,
        });
        default: return ({
          headerText: `${month + 1} & ${year}`,
        });
      }
    },
  ),
);

export default hoc(CalendarHeader);
