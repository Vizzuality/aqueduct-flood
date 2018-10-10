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
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" /> */}
        <meta name="theme-color" content="#ffffff" />


        {/* social */}
        <meta property="og:title" content={`Aqueduct Flood - ${title}`} />
        {/* <meta property="og:description" content={META_TAG_DESCRIPTION} /> */}
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta property="og:url" content="https://psapretrial.org/" /> */}

      </HeadNext>
    );
  }
}

export default Head;
