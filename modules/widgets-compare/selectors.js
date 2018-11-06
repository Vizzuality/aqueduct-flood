import { createSelector } from 'reselect';

const getWidgetsCompare = state => state.widgetsCompare;

export const isCompareAWidgetLoading = createSelector(
  [getWidgetsCompare],
  (_widgets = []) =>
    !!(_widgets.find(_widget => _widget.loading))
);

export default { isCompareAWidgetLoading };
