import * as React from 'react';
// import type Moment from 'moment';

import { MONTH_LABELS } from '../../../../shared/constants';
import styles from './MonthPanel.m.css';

type Props = {
  year: number,
  panelClickHandler: () => any,
};

const MonthPanel = ({
  year,
  panelClickHandler,
}: Props) => (
  <section
    className={styles['month-label-container']}
  >
    {
      MONTH_LABELS.map(monthObj => (
        <div
          key={monthObj.value}
          className={styles['month-label']}
          onClick={panelClickHandler(year, monthObj.value)}
        >
          { monthObj.label }
        </div>
      ))
    }
  </section>
);

export default MonthPanel;
