import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import { downloadJSON } from '~/helpers/fileUtils';

export default class DownloadJSONButton extends Component {
  static propTypes = {
    getFileInfo: PropTypes.func.isRequired,
    props: PropTypes.object,
  }
  static defaultProps = {
    props: {},
  }
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.props.getFileInfo().then(({ name, content }) => {
      downloadJSON(content, name);
    });
  }
  render() {
    return (
      <Button {...this.props.props} onClick={this.handleClick} />
    );
  }
}
