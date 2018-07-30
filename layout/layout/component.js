import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Utils
import { initGA, logPageView } from 'utils/analytics';

// Next
import { Router } from 'routes';

// Components
import Head from 'layout/head';
import Header from 'layout/header';
import LoadingBar from 'react-redux-loading-bar';

class Layout extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
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

    Router.onRouteChangeStart = () => {
      showLoading();
    };

    Router.onRouteChangeComplete = () => {
      hideLoading();
    };
  }

  render() {
    const { title, description, children } = this.props;

    return (
      <div id="#main" className="l-page">
        <Head title={title} description={description} />
        <Header />
        <div className="page-content">
          {children}
        </div>
        <LoadingBar className="c-loading-bar" />
      </div>
    );
  }
}

export default Layout;
