import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import Head from 'layout/head';
import Header from 'layout/header';

// utils
import { initGA, logPageView } from 'utils/analytics';

class LayoutEmbed extends PureComponent {
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
        className="l-embed-page"
      >
        <Head
          title={title}
          description={description}
        />
        <Header embed />
        <div className="embed-content">
          {children}
        </div>
      </div>
    );
  }
}

export default LayoutEmbed;
