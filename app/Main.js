/**
 * @author DucPL
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../app/login/login'
import Home from '../app/navigator/Home'
import StackHome from './navigator/StackHome';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      const {dispatch, isLoginSuccess} = this.props;
      console.log("MAIN WILL MOUNTTTTTTTTTTTTT");
    }

    render() {
      const {isLoginSuccess} = this.props;
      switch (isLoginSuccess) {
        case true:
          return <StackHome />;
        default:
          return <Login/>;
      }
    }
}

export default connect(state => ({
  isLoginSuccess: state.LoginReducer.isLoginSuccess

}))(Main);