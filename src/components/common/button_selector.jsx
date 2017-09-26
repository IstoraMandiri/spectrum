import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

export default class ButtonSelector extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    formData: PropTypes.object.isRequired,
    formChange: PropTypes.func.isRequired,
    props: PropTypes.object,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    singleSelection: PropTypes.bool,
  }
  static defaultProps = {
    props: undefined,
    name: undefined,
    label: undefined,
    singleSelection: false,
  }
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }
  renderItem(item) {
    // TODO extend to allow for non-formdata-injected items
    const { formChange, name, formData, props, singleSelection } = this.props;
    const text = item.text || item.name;
    const onClick = (e) => {
      e.preventDefault();
      // get the new list of networks
      const formDataItem = (formData[name] || []);
      const isEnabled = formDataItem.indexOf(item.id) > -1;
      let value;
      if (singleSelection) {
        value = isEnabled ? [] : [item.id];
      } else {
        value = isEnabled ? formDataItem.filter(id => id !== item.id) : formDataItem.concat(item.id);
      }
      formChange({ target: { name, value } });
    };
    const isEnabled = (formData[name] || []).indexOf(item.id) > -1;
    const color = (isEnabled && item.color) || undefined;
    const icon = isEnabled ? 'checkmark' : 'remove';
    return (
      <Button
        size="small"
        {...props}
        key={item.id}
        labelPosition="left"
        icon={`${icon}`}
        content={text}
        onClick={onClick}
        color={color}
      />
    );
  }
  render() {
    const { items, label } = this.props;
    return (
      <Form.Field>
        {label && <label htmlFor={label}>{label}</label>}
        {items.map(this.renderItem)}
      </Form.Field>
    );
  }
}
