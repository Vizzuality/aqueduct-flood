import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Head from 'layout/head';

// utils
import { initGA, logPageView } from 'utils/analytics';

class LayoutPreview extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  componentDidMount() {
    // Google Analytics
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    const { title, description, children } = this.props;

    return (
      <div
        id="#main"
        className="l-preview-page"
      >
        <Head
          title={title}
          description={description}
        />
        <div className="preview-content">
          {children}
        </div>
      </div>
    );
  }
}

export default LayoutPreview;
