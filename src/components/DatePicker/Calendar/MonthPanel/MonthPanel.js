import * as React from 'react';
import classnames from 'classnames';
import {
  compose,
  withProps,
} from 'recompose';

import { MONTH_LABELS } from '../../../../shared/constants';
import styles from './MonthPanel.m.css';

type Props = {
  baseMonth: number,
  year: number,
  panelClickHandler: () => any,
};

const MonthPanel = ({
  baseMonth,
  year,
  panelClickHandler,
}: Props) => (
  <section
    className={styles['month-panel-container']}
  >
    {
      MONTH_LABELS.map(monthObj => (
        <div
          key={monthObj.value}
          className={
            classnames([styles['month-label']], {
              [styles['is-base-month']]: monthObj.value === baseMonth,
            })
          }
          onClick={panelClickHandler(year, monthObj.value)}
        >
          { monthObj.label }
        </div>
      ))
    }
  </section>
);

const hoc = compose(
  withProps(
    ({ baseDate }) => ({
      baseMonth: baseDate.month(),
    }),
  ),
);

export default hoc(MonthPanel);
