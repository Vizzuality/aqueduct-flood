import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// constants
import { MODAL_INFO_DEFINITIONS } from './constants';

// styles
import './styles.scss';

class ModalInfo extends PureComponent {
  static propTypes = {
    options: PropTypes.shape({
      key: PropTypes.string.isRequired
   }).isRequired
  }

  render() {
    const { options: { key } } = this.props;

    return (
      <div className="c-modal-info">
        <h3 className="modal-title">
          {MODAL_INFO_DEFINITIONS[key].title}
        </h3>
        <div className="modal-content">
          {MODAL_INFO_DEFINITIONS[key].instructions && (
            <div>
              <span className="content-key">
                Instructions:
              </span>
              <div className="content-value" dangerouslySetInnerHTML={{ __html: MODAL_INFO_DEFINITIONS[key].instructions }} />
            </div>
          )}

          {MODAL_INFO_DEFINITIONS[key].description && (
            <div>
              <span className="content-key">
                Description:
              </span>
              <div className="content-value" dangerouslySetInnerHTML={{ __html: MODAL_INFO_DEFINITIONS[key].description }} />
            </div>
          )}

          {MODAL_INFO_DEFINITIONS[key].source && (
            <div>
              <span className="content-key">
                Source:
              </span>
              <div className="content-value" dangerouslySetInnerHTML={{ __html: MODAL_INFO_DEFINITIONS[key].source }} />
            </div>
          )}
          {/* <div dangerouslySetInnerHTML={{ __html: MODAL_INFO_DEFINITIONS[key].source }} /> */}
        </div>
      </div>
    );
  }
}

export default ModalInfo;
