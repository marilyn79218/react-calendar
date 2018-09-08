// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../components/shared/Button';

storiesOf('Button', module)
  .add('Overall', () => (
    <div>
      <Button
        onClick={action('button-click')}
        id="btn-story"
      >
        View LALA
      </Button>
    </div>
  ));
