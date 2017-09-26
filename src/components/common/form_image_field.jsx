import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

import { resizeDataUri } from '~/helpers/fileUtils';

export default class FormImageField extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    accept: PropTypes.string,
    multiple: PropTypes.string,
    resizeWidth: PropTypes.number,
    resizeQuality: PropTypes.number,
  }
  static defaultProps = {
    accept: undefined,
    multiple: undefined,
    resizeWidth: undefined,
    resizeQuality: undefined,
  }
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    e.target.nextSibling.click();
  }
  handleChange(e) {
    const { resizeWidth, resizeQuality } = this.props;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (resizeWidth) {
        resizeDataUri(reader.result, resizeWidth, resizeQuality).then((value) => {
          this.props.formChange({ target: { name: this.props.name, value, file } });
        });
      } else {
        this.props.formChange({ target: { name: this.props.name, value: reader.result, file } });
      }
    };
    return reader.readAsDataURL(file);
  }
  render() {
    const { accept, multiple, resizeWidth, resizeQuality, formChange, ...rest } = this.props;
    return (
      <Form.Field>
        <Button
          {...rest}
          onClick={this.handleClick}
        />
        <input
          type="file"
          style={{ visibility: 'hidden', position: 'absolute' }}
          onChange={this.handleChange}
          {...{ accept, multiple }}
        />
      </Form.Field>
    );
  }
}
