import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'aqueduct-components';
import ReactIframeResizer from 'react-iframe-resizer-super';

// constants
import { SHARE_TABS } from './constants';

// styles
import './styles.scss';

class ModalShareWidget extends PureComponent {
  static propTypes = {
    options: PropTypes.object
  }

  static defaultProps = { options: {} }

  state = {
    width: 0,
    height: 0,
    tab: 'share'
  }

  onCopy = () => {
    const { input } = this;

    input.select();

    try {
      if (this.timeout) clearTimeout(this.timeout);

      document.execCommand('copy');

      this.setState({ copied: true });

      this.timeout = setTimeout(() => {
        this.setState({ copied: false });
      }, 2000);
    } catch (err) {
      console.error('Oops, unable to copy');
    }
  }

  render() {
    const { options } = this.props;
    const { width, height, copied } = this.state;
    const { embedURL } = options;
    const shareableUrl  = `${window.location.origin}${embedURL}`;
    const iframeUrl = `<iframe src="${shareableUrl}" width="${width}" height="${height}" frameBorder="0" />`;

    return (
      <div className="c-modal-share-widget">
        {/* <Tabs
          tabs={SHARE_TABS}
          onChange={this.onChangeTab}
          customClass="l-tabs"
        /> */}

        <div className="url-sharer">
          <input
            readOnly
            value={iframeUrl}
            id="url-share"
            name="url-share"
            ref={(n) => { this.input = n; }}
          />
          <Button
            onClick={this.onCopy}
            theme="light"
            className="-large -bg-light-blue -uppercase -bold"
          >
            {copied ? 'Copied' : 'Get embed code'}
          </Button>
        </div>

        <div className="container">

          {/* {tab === 'embed' && ( */}
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
              log: false,
              resizedCallback: ({ height: h, width: w }) => {
                this.setState({ height: `${h}px`, width: `${w}px` });
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default ModalShareWidget;
