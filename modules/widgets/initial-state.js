import { WIDGETS } from 'mocks/widgets';

export default WIDGETS.map(widget => ({
  id: widget.id,
  params: {
    title: widget.title,
    type: widget.type
  },
  data: [],
  loading: false,
  error: null
}));
