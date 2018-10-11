import React from "react";
import PropTypes from "prop-types";
import HeadNext from "next/head";

class Head extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  render() {
    const { title, description } = this.props;

    return (
      <HeadNext>
        <title>
          {`Aqueduct Flood - ${title}`}
        </title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Vizzuality" />
        <meta property="og:title" content="Aqueduct Flood" />
        <meta property="og:description" content="Aqueduct Flood descriptions" />

        {/* favicon */}
        <link rel="apple-touch-icon" sizes="57x57" href="/static/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/static/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/static/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/static/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/static/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="manifest" href="/static/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/static/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </HeadNext>
    );
  }
}

export default Head;
