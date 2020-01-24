import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Utils
import { initGA, logPageView } from 'utils/analytics';

// Next
// import { Router } from 'routes';

import { Modal } from 'aqueduct-components';

// components
import LoadingBar from 'react-redux-loading-bar';
import Head from 'layout/head';
import Header from 'layout/header';
// components – modals
import ModalInfo from 'components/ui/modals/modal-info';
import ModalEmbedWidget from 'components/ui/modals/modal-embed-widget';
import ModalInfoWidget from 'components/ui/modals/modal-info-widget';

class LayoutCBAEmbed extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    modal: PropTypes.shape({
      visible: PropTypes.bool.isRequired,
      options: PropTypes.object.isRequired
    }).isRequired,
    resetModal: PropTypes.func.isRequired,
    showLoading: PropTypes.func.isRequired,
    hideLoading: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { showLoading, hideLoading } = this.props;
    // Google Analytics
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    const { title, description, children, modal, resetModal } = this.props;
    const { options: modalOptions } = modal;

    return (
      <div id="#main" className="l-page">
        <Head title={title} description={description} />
        <Header 
          appRoute="https://www.wri.org/applications/aqueduct/floods" 
        />
        <div className="page-content">
          {children}
        </div>
        <LoadingBar className="c-loading-bar" />

        <Modal
          isOpen={modal.visible}
          appElement=".l-page"
          onRequestClose={() => resetModal()}
          customClass="app-modal"
        >
          {modalOptions.type === 'info' && <ModalInfo options={modalOptions} />}
          {modalOptions.type === 'widget-share' && <ModalEmbedWidget options={modalOptions} />}
          {modalOptions.type === 'widget-info' && <ModalInfoWidget options={modalOptions} />}
        </Modal>
      </div>
    );
  }
}

export default LayoutCBAEmbed;
