import { PureComponent } from 'react';

// styles
import 'css/index.scss';

class Page extends PureComponent {
  static async getInitialProps({
    asPath,
    pathname,
    query,
    isServer
  }) {
    const url = { asPath, pathname, query };

    return { isServer, url };
  }
}

export default Page;
