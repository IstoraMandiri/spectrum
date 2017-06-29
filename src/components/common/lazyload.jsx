import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';

function asyncComp(getComp) {
  return class AsyncComp extends Component {
    static Comp = null;
    state = { Comp: AsyncComp.Comp };

    componentWillMount() {
      if (!this.state.Comp) {
        getComp().then((Comp) => {
          AsyncComp.Comp = Comp;
          this.setState({ Comp });
        });
      }
    }
    render() {
      const { Comp } = this.state;
      if (Comp) {
        return <Comp {...this.props} />;
      }
      return <Loader />;
    }
  };
}

export default promise => asyncComp(() => promise().then(module => module.default));
