import initialState from 'modules/filters/initial-state';

export default {
  ...initialState,
  common: {
    ...initialState.common,
    geogunit_unique_name: null
  }
};
