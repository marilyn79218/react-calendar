// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export type AllState = {
  router: mixed,
}

type AppReducers = (allState?: AllState, action: { type: string }) => AllState;

const appReducers: AppReducers = combineReducers({
  router: routerReducer,
});

type Reducers = (state: AllState, action: {
  type: string,
}) => AllState;

const reducers: Reducers = (state, action) => {
  switch (action.type) {
    default:
      return appReducers(state, action);
  }
};

export default reducers;
