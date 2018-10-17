import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { Icons as AQIcons }  from 'aqueduct-components';

// layout components
import { Icons as WRIIcons } from 'wri-api-components';
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
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js" />
          <script src="https://unpkg.com/esri-leaflet/dist/esri-leaflet.js" />
          <script src="https://unpkg.com/leaflet-utfgrid/L.UTFGrid-min.js" />

          <meta name="viewport" content="width=1024, user-scalable=no" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          {/* icons */}
          <Icons />
          <AQIcons />
          <WRIIcons />

          {/* Main */}
          <Main />

          {/* Next script */}
          <NextScript />
        </body>
      </html>
    );
  }
}
