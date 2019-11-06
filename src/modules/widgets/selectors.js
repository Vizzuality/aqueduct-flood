import { createSelector } from 'reselect';

const getWidgets = state => state.widgets;
const getWidgetsCompare = state => state.widgetsCompare;

export const isAWidgetLoading = createSelector(
  [getWidgets, getWidgetsCompare],
  (_widgets = [], _widgetsCompare = []) =>
    !!([..._widgets, _widgetsCompare].find(_widget => _widget.loading))
);

export default { isAWidgetLoading };
