import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// constants
import { MODAL_INFO_DEFINITIONS } from './constants';

// styles
import './styles.scss';

class ModalInfo extends PureComponent {
  static propTypes = { options: PropTypes.shape({
    key: PropTypes.string.isRequired
  })}

  render() {
    const { options } = this.props;
    const { key } = options;

    return (
      <div className="c-modal-info">
        <h3 className="modal-title">
          {MODAL_INFO_DEFINITIONS[key].title}
        </h3>
        <div className="modal-content" dangerouslySetInnerHTML={{ __html: MODAL_INFO_DEFINITIONS[key].description }} />
      </div>
    );
  }
}

export default ModalInfo;
