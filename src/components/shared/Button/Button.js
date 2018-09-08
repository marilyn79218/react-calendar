// @flow
import * as React from 'react';

type Props = {
  children?: React.Node,
  // style?: {},
  // onClick?: (e: SyntheticEvent<>) => mixed,
  // disabled?: boolean,
  // id?: string,
};

const Button = ({
  children,
}: Props) => (
  <button>
    { children }
  </button>
);

export default Button;
