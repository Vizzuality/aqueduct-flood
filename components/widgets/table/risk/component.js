import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formatSpecifier, precisionFixed, format  } from 'd3-format';

// styles
import '../styles.scss';

class RiskTableChart extends PureComponent {
  static propTypes = { data: PropTypes.array.isRequired }

  render() {
    const { data } = this.props;

    const s = formatSpecifier('-s');
    s.precision = precisionFixed(0.01, 1.01);
    const parse = format(s);

    const p = Math.max(0, precisionFixed(0.01, 1.01));
    const percentageFormat = format(`.${p}%`);

    return (
      <div className="c-table-widget">
        <table>
          <thead>
            <tr>
              <td />
              <td>
                2010
              </td>
              <td>
                2030
              </td>
              <td>
                2050
              </td>
              <td>
                2080
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Annual Expected Urban Damage
              </td>
              {data.map((_row, i) => (
                <td key={`${_row.Annual_Damage_Avg}-2010-${i}`}>
                  {parse(_row.Annual_Damage_Avg)}
                </td>))
              }
            </tr>
            <tr>
              <td>
                Urban Asset Value
              </td>
              {data.map((_row, i) => (
                <td key={`${_row.Asset_Value}-2030-${i}`}>
                  {parse(_row.Asset_Value)}
                </td>))
              }
            </tr>
            <tr>
              <td>
                % Annual Expected Urban Damage
              </td>
              {data.map((_row, i) => (
                <td key={`${_row.Percent_Damage_Avg}-2050-${i}`}>
                  {percentageFormat(_row.Percent_Damage_Avg)}
                </td>))
              }
            </tr>
            <tr>
              <td>
              Estimated Flood Protection Level
              </td>
              {data.map((_row, i) => (
                <td key={`${_row.Flood_Protection}-2080-${i}`}>
                  {parse(_row.Flood_Protection)}
                </td>))
              }
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default RiskTableChart;
