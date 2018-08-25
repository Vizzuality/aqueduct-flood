import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';

// styles
import './styles.scss';

class TableChart extends PureComponent {
  static propTypes = { data: PropTypes.array.isRequired }

  render() {
    const { data } = this.props;
    const parse = format("-s");

    return (
      <div className="c-table-widget">
        <table>
          <tbody>
            <tr>
              <td>
                Avoided GDP impacted
              </td>
              {data.map(_row => (
                <td>
                  {`${parse(_row.avoidedGdp)} USD`}
                </td>))
              }
            </tr>
            <tr>
              <td>
                Avoided population impacted
              </td>
              {data.map(_row => (
                <td>
                  {parse(_row.avoidedPop)}
                </td>))
              }
            </tr>
            <tr>
              <td>
                Cost-Benefit Ratio
              </td>
              {data.map(_row => (
                <td>
                  {parse(_row.bcr)}
                </td>))
              }
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableChart;
