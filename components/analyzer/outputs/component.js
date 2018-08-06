import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// componets
import Widget from 'components/widget';
import BarChart from 'components/widgets/bar-chart';

// constants
import { WIDGETS } from 'mocks/widgets';

// styles
import './styles.scss';

class AnalyzerOutputs extends PureComponent {
  static propTypes = { filters: PropTypes.object.isRequired }

  render() {
    const { filters } = this.props;

    return (
      <div className="c-analyzer-outputs">
        <div className="container">
          {WIDGETS.map(widget => (
            <div key={widget.id} className="widget-row">
              <Widget
                params={{ id: widget.id, filters }}
              >
                {_widget => (<BarChart data={{ table: _widget.data}} />)}
              </Widget>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AnalyzerOutputs;
