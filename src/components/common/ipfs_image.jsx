import React, { Component } from 'react';
import PropTypes from 'prop-types';
import multihash from 'multi-hash';

import { IPFS_GATEWAY } from '~/helpers/constants';
import { dePrefix } from '~/helpers/stringUtils';
import Advanced from '~/components/common/advanced';

const cache = {};

export default class IPFSImage extends Component {
  static propTypes = {
    hex: PropTypes.string,
    showHash: PropTypes.bool,
    ipfsHash: PropTypes.string,
  };
  static defaultProps = {
    hex: undefined,
    showHash: false,
    ipfsHash: undefined,
  }
  constructor(props) {
    super(props);
    const json = cache[this.getUrl()];
    this.state = json ? { json, loading: false } : { loading: true };
  }
  componentDidMount() {
    if (this.state.loading) {
      const url = this.getUrl();
      fetch(url).then(data => data.json()).then((json) => {
        cache[url] = json;
        this.setState({ loading: false, json });
      }).catch(() => this.setState({ loading: false }));
    }
  }
  getHash() {
    const { hex, ipfsHash } = this.props;
    return ipfsHash || multihash.encode(dePrefix(hex));
  }
  getUrl() {
    return `${IPFS_GATEWAY}${this.getHash()}`;
  }
  render() {
    const { showHash } = this.props;
    const hash = this.getHash();
    if (this.state.loading) {
      return <p>Loading...<br />ipfs: {hash}</p>;
    }
    if (!this.state.json) {
      return <p>Error!</p>;
    }
    const { docHash, title, timestamp } = this.state.json;
    const jsonUrl = this.getUrl();
    const imgUrl = `${IPFS_GATEWAY}${docHash}`;
    return (
      <div>
        {showHash &&
          <p>
            Title: {title} <br />
            Timestamp: {timestamp} <br />
            Meta: <a href={jsonUrl} rel="noopener noreferrer" target="_blank">{jsonUrl}</a> <br />
            Image: <a href={imgUrl} rel="noopener noreferrer" target="_blank">{imgUrl}</a>
          </p>
        }
        <Advanced title="View Image">
          <p><img src={imgUrl} alt={hash} style={{ width: '100%' }} /></p>
        </Advanced>
      </div>
    );
  }
}
