import React, { PropTypes, Component } from 'react';
import { Form } from 'semantic-ui-react';

export default class FormField extends Component {
  static propTypes = {
    formChange: PropTypes.func.isRequired,
    formData: PropTypes.object,
    name: PropTypes.string.isRequired,
    defaultValue: PropTypes.any,
    options: PropTypes.array,
  };
  static defaultProps = {
    defaultValue: undefined,
    options: undefined,
    formData: {},
  }
  componentDidMount() {
    const { formChange, defaultValue, name } = this.props;
    if (defaultValue) {
      formChange({ target: { name, value: defaultValue } });
    }
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.name !== this.props.name) { return true; }
    if (this.props.formData[this.props.name] !== nextProps.formData[nextProps.name]) { return true; }
    return false;
  }
  render() {
    const { formChange, formData, name, options, ...rest } = this.props;
    const value = formData[name] === undefined ? '' : formData[name];
    if (rest.type === 'select') {
      const mappedOptions = options.map(({ id, name: text }) => ({ key: id, value: id, text }));
      return (
        <Form.Select
          {...rest}
          options={mappedOptions}
          onChange={(e, data) => formChange({ target: { name: data.name, value: data.value } })}
          name={name}
          value={value}
        />
      );
    }
    return (
      <Form.Field
        {...rest}
        onChange={e => formChange({ target: { name: e.target.name, value: e.target.value } })}
        name={name}
        value={value}
        control="input"
      />
    );
  }
}
