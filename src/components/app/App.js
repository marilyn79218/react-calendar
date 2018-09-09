// @flow
import * as React from 'react';
import DatePicker from '../DatePicker';

type Props = {
  children: React.Node,
};

const App = ({ children }: Props) => (
  <div
    style={{
      padding: '50px',
    }}
  >
    {children}
    <DatePicker />
  </div>
);

export default App;
