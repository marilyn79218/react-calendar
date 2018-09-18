// @flow
import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DatePicker from '../components/DatePicker';

const date = moment();
storiesOf('DatePicker', module)
  .add('Overall', () => (
    <div
      style={{
        margin: '30px',
      }}
    >
      <DatePicker
        date={date}
        onSelect={action('DatePicker-click')}
        id="date-picker-story"
      />
    </div>
  ));
