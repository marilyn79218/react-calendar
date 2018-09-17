// @flow
import moment from 'moment';

export const BASENAME: string = process.env.PUBLIC_URL || '/';
export const DEVELOPMENT: string = 'development';
export const NODE_ENV: string = process.env.NODE_ENV || DEVELOPMENT;

export type FetchStatus = 'NOT_FETCHED' | 'FETCHING' | 'FETCH_SUCCESS' | 'FETCH_FAILURE';
export const FETCH_STATUS_MAP: {
  [key: string]: FetchStatus
} = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
};

export const TOKEN_KEY: string = 'VISION_API_TOKEN_KEY';

export const LOGIN_STATUS = {
  NOT_LOGIN: 'NOT_LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TYPE_LENGTH = {
  year: 4,
  month: 2,
  dateValue: 2,
};
export const BASE_YEAR = 1970;
export const ROW_COUNTS = 6;
export const WEEK_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
export const WEEKDAYS_COUNTS = WEEK_LABELS.length;
export const MONTH_LABELS = moment.monthsShort().map((monthName, index) => ({
  label: monthName,
  value: index,
}));
export const DISPLAY_MODES = ['MONTH_DATES', 'MONTH_PANEL', 'YEAR_PANEL'];
export const MODE_INTERACTIVE = {
  [DISPLAY_MODES[0]]: {
    prevMode: null,
    nextMode: DISPLAY_MODES[1],
  },
  [DISPLAY_MODES[1]]: {
    prevMode: DISPLAY_MODES[0],
    nextMode: DISPLAY_MODES[2],
  },
  [DISPLAY_MODES[2]]: {
    prevMode: DISPLAY_MODES[1],
    nextMode: null,
  },
};
