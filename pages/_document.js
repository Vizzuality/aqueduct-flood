import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

// Layout components
import Icons from 'components/ui/icons';

export default class MyDocument extends Document {
  render() {
    return (
      <html
        lang="en"
      >
        {/*
          Don't put anything dynamic here,
          this file will only be rendered in the server side
        */}
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          {/* Icons */}
          <Icons />

          {/* Main */}
          <Main />

          {/* Next script */}
          <NextScript />
        </body>
      </html>
    );
  }
}
