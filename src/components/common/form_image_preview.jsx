import React, { PropTypes, Component } from 'react';
import { Segment, Image, Form } from 'semantic-ui-react';
import FormImageField from './form_image_field';

export default class FormImagePreview extends Component {
  static propTypes = {
    preview: PropTypes.string,
  }
  static defaultProps = {
    preview: undefined,
  }
  render() {
    const { preview, ...rest } = this.props;
    return (
      <Form.Field>
        <FormImageField {...rest} />
        {preview &&
          <Segment>
            <Image fluid rounded src={preview} alt="" />
          </Segment>
        }
      </Form.Field>
    );
  }
}
