import { WIDGETS } from 'mocks/widgets';
import initialState from 'modules/app/initial-state';

export default WIDGETS[initialState.tab].map(widget => ({
  id: widget.id,
  params: { title: widget.title },
  data: [],
  loading: false,
  error: null
}));
