import React, { Component } from 'react';

export default WrappedComponent => {
  return class WithSelect extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectLib: null
      };
    }
    componentDidMount() {
      import('react-select').then(module => {
        this.setState({
          selectLib: module
        });
      });
    }

    render() {
      return <WrappedComponent selectLib={this.state.selectLib} {...this.props} />;
    }
  };
};
