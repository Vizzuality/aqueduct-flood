import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { replace } from 'redux-first-router';

class URLManager extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    urlProps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    urlFromParams: PropTypes.shape({}).isRequired,
    paramsFromUrl: PropTypes.shape({}).isRequired,
  }

  componentWillMount() {
    const { urlProps, paramsFromUrl } = this.props;

    urlProps.forEach(r => {
      const action = this.props[r.action];
      const payload = paramsFromUrl[r.value];

      action(payload);
    });
  }

  componentDidUpdate(prevProps) {
    const { url } = this.props;
    const { url: prevUrl } = prevProps;

    if (url !== prevUrl) replace(url);
  }

  render() {
    return null;
  }
}

export default URLManager;