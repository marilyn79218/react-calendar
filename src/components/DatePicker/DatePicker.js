// @flow
import * as React from 'react';
import moment from 'moment';
import type Moment from 'moment';
import {
  compose,
  withState,
  withHandlers,
} from 'recompose';
import CalendarSVGIcon from '@material-ui/icons/CalendarTodayTwoTone';

import {
  DATE_TYPE_LENGTH,
  BASE_YEAR,
} from '../../shared/constants';
import Calendar from './Calendar';
import styles from './DatePicker.m.css';

type Props = {
  baseDate: Moment,
  updateBaseDate: Moment => any,
  isCalendarOpen: boolean,
  setIsCalendarOpen: boolean => any,
  panelUpdateBaseDate: string => any,
  dateChangeHandler: string => SyntheticInputEvent<EventTarget> => any,
  showDate: {
    year: number,
    month: number,
    dateValue: number,
  },
};

const today = moment();
const SHOW_DATE = {
  year: today.year().toString(),
  month: (today.month() + 1).toString(),
  dateValue: today.date().toString(),
};

const DatePicker = ({
  baseDate,
  updateBaseDate,
  isCalendarOpen,
  setIsCalendarOpen,
  panelUpdateBaseDate,
  dateChangeHandler,
  showDate: {
    year: showYear,
    month: showMonth,
    dateValue: showDateValue,
  },
}: Props) => (
  <React.Fragment>
    <section
      className={styles['date-picker-container']}
      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
    >
      <CalendarSVGIcon />
      <input
        className={styles['picker-input-year']}
        type="text"
        value={showYear}
        onChange={dateChangeHandler('year')}
        maxLength={DATE_TYPE_LENGTH.year}
      />
      <span>
        -
      </span>
      <input
        className={styles['picker-input-month']}
        type="text"
        value={showMonth}
        onChange={dateChangeHandler('month')}
        maxLength={DATE_TYPE_LENGTH.month}
      />
      <span>
        -
      </span>
      <input
        className={styles['picker-input-date']}
        type="text"
        value={showDateValue}
        onChange={dateChangeHandler('dateValue')}
        maxLength={DATE_TYPE_LENGTH.dateValue}
      />
    </section>
    {
      isCalendarOpen ? (
        <Calendar
          date={baseDate}
          onSelect={updateBaseDate}
          setIsCalendarOpen={setIsCalendarOpen}
          panelUpdateBaseDate={panelUpdateBaseDate}
        />
      ) : null
    }
  </React.Fragment>
);

const hoc = compose(
  withState('baseDate', 'setBaseDate', today),
  withState('showDate', 'setShowDate', SHOW_DATE),
  withState('isCalendarOpen', 'setIsCalendarOpen', false),
  withHandlers({
    isLegalYear: () => showDate => Number(showDate.year) >= BASE_YEAR,
    leftpadding: () => (dateType = 'dateValue', value) =>
      (value.length < DATE_TYPE_LENGTH[dateType] ?
        [...new Array(DATE_TYPE_LENGTH[dateType] - value.length)].fill('0').join('') + value :
        value),
  }),
  withHandlers({
    updateBaseDate: props => (date) => {
      const {
        setShowDate,
        setBaseDate,
      } = props;

      setBaseDate(date);

      const nextShowDate = {
        year: date.year().toString(),
        month: (date.month() + 1).toString(),
        dateValue: date.date().toString(),
      };
      setShowDate(nextShowDate);
    },
    panelUpdateBaseDate: props => (targetYear, targetMonth = 0, targetDate = 1) => {
      const {
        setShowDate,
        setBaseDate,
      } = props;

      const firstDate = moment().year(targetYear).month(targetMonth).date(targetDate);
      setBaseDate(firstDate);

      const nextShowDate = {
        year: firstDate.year().toString(),
        month: (firstDate.month() + 1).toString(),
        dateValue: firstDate.date().toString(),
      };
      setShowDate(nextShowDate);
    },
    dateChangeHandler: props => (changedDateType = 'date') => (e) => {
      const {
        isLegalYear,
        leftpadding,
        setShowDate,
        setBaseDate,
        showDate,
      } = props;

      const nextValue = e.target.value;
      let nextShowDateStr = '';
      const nextShowDateObj = Object.keys(showDate).reduce((pV, cV) => {
        if (cV === changedDateType) {
          nextShowDateStr += leftpadding(cV, nextValue);
          return {
            ...pV,
            [changedDateType]: nextValue,
          };
        }

        nextShowDateStr += leftpadding(cV, showDate[cV]);
        return {
          ...pV,
          [cV]: showDate[cV],
        };
      }, {});

      setShowDate(nextShowDateObj);

      const nextShowDate = moment(nextShowDateStr);
      if (nextShowDate.isValid() && isLegalYear(nextShowDateObj)) {
        setBaseDate(nextShowDate);
      }
    },
  }),
);

export default hoc(DatePicker);
