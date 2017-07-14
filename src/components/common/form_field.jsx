import React, { PropTypes, Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class FormField extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.any,
    options: PropTypes.array,
  };
  static defaultProps = {
    defaultValue: undefined,
    options: undefined,
  }
  componentDidMount() {
    const { formChange, defaultValue, name } = this.props;
    if (defaultValue) {
      formChange({ target: { name, value: defaultValue } });
    }
  }
  render() {
    const { formChange, formData, name, options, ...rest } = this.props;
    const value = formData[name] === undefined ? '' : formData[name];
    if (rest.type === 'select') {
      const mappedOptions = options.map(({ id, name: text }) => ({ key: id, value: id, text }));
      return <Form.Select {...rest} options={mappedOptions} onChange={formChange} name={name} value={value} />;
    }
    return <Form.Field {...rest} onChange={formChange} name={name} value={value} control="input" />;
  }
}
