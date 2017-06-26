import React, { PropTypes, Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class FormField extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.any,
  };
  static defaultProps = {
    defaultValue: undefined,
  }
  componentDidMount() {
    const { formChange, defaultValue, name } = this.props;
    if (defaultValue) {
      formChange({ target: { name, value: defaultValue } });
    }
  }
  render() {
    const { formChange, formData, name, ...rest } = this.props;
    const value = formData[name] === undefined ? '' : formData[name];
    return (
      <Form.Field {...rest} onChange={formChange} name={name} value={value} control="input" />
    );
  }
}
