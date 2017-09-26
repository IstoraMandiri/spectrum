import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form } from 'semantic-ui-react';

import { SUI_COLORS } from '~/helpers/constants';

import { capitalize } from '~/helpers/stringUtils';

export default class ColorPicker extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    formChange: PropTypes.func.isRequired,
    label: PropTypes.string,
  }
  static defaultProps = {
    label: 'Color',
  }
  render() {
    const { formData, formChange, label } = this.props;
    return (
      <Form.Field>
        <label htmlFor={label}>{label}</label>
        <Dropdown
          labeled
          button
          fluid
          floating
          text={(formData.color && capitalize(formData.color)) || 'Select Color'}
          className={`icon ${formData.color || ''}`}
        >
          <Dropdown.Menu>
            <Dropdown.Menu scrolling >
              {SUI_COLORS.map(key => (
                <Dropdown.Item
                  {...{ key, value: key, text: capitalize(key), label: { color: key, empty: true, circular: true } }}
                  onClick={() => { formChange({ name: 'color', value: key }); }}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Field>
    );
  }
}
