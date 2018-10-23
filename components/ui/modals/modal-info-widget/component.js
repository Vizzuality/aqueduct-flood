import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactIframeResizer from 'react-iframe-resizer-super';

// styles
import './styles.scss';

class ModalInfoWidget extends PureComponent {
  static propTypes = {
    options: PropTypes.object
  }

  static defaultProps = { options: {} }

  render() {
    const { options } = this.props;
    const { widget, embedURL } = options;
    const { title, params } = widget;
    const { description, sources } = params;

    return (
      <div className="c-modal-info-widget">
        <div className="info-header">
          <div className="info-titles">
            <span className="info-title">
              {title}
            </span>
          </div>
        </div>
        <div className="info-content">
          <div className="row">
            <div className="col-xs-12 col-md-8">
              <div className="info-widget">
                <div className="widget-content">
                  <ReactIframeResizer
                    title="widget-preview"
                    src={embedURL}
                    frameBorder={0}
                    style={{
                      width: '100%',
                      minHeight: 350
                    }}
                    iframeResizerOptions={{
                      checkOrigin: false,
                      log: false
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-4">
              <div className="info-description">
                <dl>
                  <dt>
                    Description:
                  </dt>
                  <dd>
                    {description || 'not available'}
                  </dd>
                  <dt>
                    Sources:
                  </dt>
                  <dd>
                    {(sources || []).map((_source, index) => (
                      <a
                        key={_source.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        href={_source.url}
                      >
                        {_source.title}
                        {(index !== sources.length - 1) && ', '}
                      </a>))}
                    {!(sources || []).length && 'not available'}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalInfoWidget;
