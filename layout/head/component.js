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
      </HeadNext>
    );
  }
}

export default Head;
