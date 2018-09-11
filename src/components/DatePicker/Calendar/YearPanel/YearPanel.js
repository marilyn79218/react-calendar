import * as React from 'react';
import classnames from 'classnames';
import {
  compose,
  withProps,
} from 'recompose';

import styles from './YearPanel.m.css';

type Props = {
  baseYear: number,
  allYears: Array<number>,
  availableYears: Array<number>,
  panelClickHandler: (number, number) => any,
};

const YearPanel = ({
  baseYear,
  allYears,
  availableYears,
  panelClickHandler,
}: Props) => (
  <section
    className={styles['year-container']}
  >
    {
      allYears.map(year => (
        <div
          key={year}
          className={
            classnames({
              [styles['is-available']]: availableYears.indexOf(year) > -1,
              [styles['is-base-year']]: year === baseYear,
            })
          }
          onClick={panelClickHandler(year)}
        >
          { year }
        </div>
      ))
    }
  </section>
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
        baseYear: year,
      });
    },
  ),
);

export default hoc(YearPanel);
