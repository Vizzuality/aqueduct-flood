import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// styles
import './styles.scss';

class SectionHeader extends PureComponent {
  static propTypes = { title: PropTypes.string.isRequired }

  render() {
    const { title } = this.props;
    return (
      <div className="c-section-header">
        <span className="section-title">
          {title}
        </span>
      </div>
    );
  }
}

export default SectionHeader;
