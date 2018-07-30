import React from 'react';

// Components
import Page from 'layout/page';

// Redux
import withRedux from 'next-redux-wrapper';
import initStore from 'store';

class ErrorPage extends Page {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const { res } = context;
    const statusCode = res ? res.statusCode : null;

    return { ...props, statusCode };
  }

  componentDidMount() {
    this.props.setRoutes(this.props.url);
  }

  render() {
    const { statusCode } = this.props;
    return (
      <div>
        {statusCode}
      </div>
    );
  }
}

export default withRedux(initStore, null, // { setRoutes }
{})(ErrorPage);
