import React, { PureComponent, Fragment } from 'react';
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
    const { params } = widget;
    const { title, description, sources } = params;

    return (
      <div className="c-modal-info-widget">
        <div className="widget-header">
          <h2 className="widget-title">
            {title}
          </h2>
        </div>
        <div className="widget-content">
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
              <div className="widget-info">
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
                  <dd className="sources">
                    {(sources || []).map((_source, index) => (
                      <Fragment>
                        <a
                          key={_source.url}
                          rel="noopener noreferrer"
                          target="_blank"
                          href={_source.url}
                        >
                          {_source.title}

                        </a>
                        {(index !== sources.length - 1) && ', '}
                      </Fragment>
                      ))}
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
