import PAGES from './initial-state';

export default (state = 'HOME', action = {}) => PAGES[action.type] || state;
