import React, { PropTypes, Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class DropdownSelector extends Component {
  static propTypes = {
    defaultText: PropTypes.string,
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    initiallySelected: PropTypes.object,
    formData: PropTypes.object,
    formChange: PropTypes.func,
    props: PropTypes.object,
    name: PropTypes.string,
    renderItem: PropTypes.func,
    resetFormData: PropTypes.func,
    renderTrigger: PropTypes.func,
    preText: PropTypes.string,
    button: PropTypes.bool,
  }
  static defaultProps = {
    defaultText: undefined,
    onChange: undefined,
    initiallySelected: undefined,
    formData: undefined,
    formChange: undefined,
    props: undefined,
    name: undefined,
    renderItem: undefined,
    resetFormData: undefined,
    renderTrigger: undefined,
    preText: undefined,
    button: undefined,
  }
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.state = { selected: this.props.initiallySelected || null };
  }
  renderItem(item) {
    const { onChange, formChange, name, formData, resetFormData, renderItem } = this.props;
    const onClick =
      (onChange && (() => onChange(item))) ||
      (formChange && (() => {
        if (formData[name] !== item.id) {
          if (resetFormData) { resetFormData(); }
          formChange({ name, value: item.id });
        }
      }));
    const label = item.color ? { color: item.color, empty: true, circular: true } : undefined;
    // if there's a renderItem, render it nd pass it the props
    const props = {
      ...item.props,
      label,
      key: item.id,
      value: item.id,
      text: item.name,
      onClick: () => {
        this.setState({ selected: item });
        if (onClick) { onClick(); }
      },
    };
    if (renderItem) { return renderItem({ props, item }); }
    return <Dropdown.Item {...props} />;
  }
  render() {
    const { defaultText, button, preText, items, props = {}, name, formData, renderTrigger, renderBottom } = this.props;
    const { selected } = this.state;
    const selectedItem = (formData && items.find(item => item.id === formData[name])) || selected;
    const labelText = (selectedItem && selectedItem.name) || defaultText || 'Select';
    const labelPrefixed = (preText && `${preText} ${labelText} `) || `${labelText} `;
    const color = (selectedItem && selectedItem.color) || '';
    return (
      <Dropdown
        labeled
        fluid
        floating
        selection={!button}
        button={button}
        {...props}
        text={labelPrefixed}
        trigger={renderTrigger && renderTrigger({ selectedItem, color })}
        className={`icon ${props.className || ''} ${!props.color ? color : ''}`}
      >
        <Dropdown.Menu>
          <Dropdown.Menu scrolling>
            {items.map(this.renderItem)}
            {renderBottom && renderBottom()}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
