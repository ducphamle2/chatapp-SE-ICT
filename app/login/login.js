/**
 * @author DucPL
 */

import React, { Component } from 'react';
import { Item, Input } from 'native-base';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  Platform,
  Dimensions,
  ImageBackground,
  Picker,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import LoginAction from '../redux/actions/LoginAction';
import StateUtil from '../utils/StateUtil';
import LoginStyle from '../assets/styles/LoginStyle';
import images from '../assets/image_source/Images';
import BackGroundImage from '../assets/background/BackGroundImage';
import validation from '../utils/validations/Validation';
import api from '../config/Api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import register from '../login/register';

class Login extends Component {
  constructor(props) {
    super(props);
    // state is set because username & password will change a lot
    this.state = {
      //username: 'ducphamle212@gmail.com',
      //password: 'Pabcdef3#',
      username: '',
      password: '',
      loginErrorMessage: '',
      color: '#DB1E4A',
      isClicked: false,
    };

    StateUtil.resetState(); // here when we get to Login component, all the states have to be reset.
  }

  // when user hit the login button
  handleLogin() {
    const { dispatch } = this.props;
    const { username, password } = this.state;
    const payload = { username, password };
    console.log('payload in handle Login: ', payload);
    api.login(payload, this.onHandle.bind(this));
    if (username === 'ducphamle212@gmail.com' && password === 'Pabcdef3#') { // fixed data
      // set time out here to wait for dispatch to finish (change isLoginSucess to true so we can move to other screens)
      setTimeout(() => {
        dispatch(LoginAction.isLoginSuccess(true));
        dispatch(LoginAction.setUsername(username)); // set username for later use
      }, 200);
    }
    else {
      // check if input are valid or not
      if (username > 50 || password > 20) {
        this.setState({ loginErrorMessage: 'username or password length is too long (max 50 and 20)' });
      }
      else if (username === '' || password === '') {
        this.setState({ loginErrorMessage: 'Please type username or password' });
      }
      else {
        this.setState({ loginErrorMessage: 'This user does not exist' });
      }
    }
  }

  onHandle(isSuccess, response, error) {
    if (isSuccess) {
      console.log('response: ' + response);
    }
    else {
      console.log('Error message: ' + error);
    }
  }

  // this function is used to render an error message if error whenever users hit the button 
  renderError() {
    const { loginErrorMessage } = this.state;
    if (loginErrorMessage !== '') {
      return <Text style={{
        marginLeft: 55,
        marginTop: 12,
        color: '#DB1E4A',
        fontSize: 12.5
      }}>{loginErrorMessage}</Text>;
    }
  }

  onHandleRegister() {
    const { dispatch } = this.props;
    console.log('before entering register');
    dispatch(LoginAction.registerEnter(true));
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 700
      }
    })
    const { username, password } = this.state;
    const { loginButtonText, loginButton, loginText, signUpButton, signUpButtonText, findButtonText, findButton } = LoginStyle;
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <Image
              style={{
                width: '100%',
                height: '50%'
              }}
              source={images.loginBackGround}>
            </Image>

            <View style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
              <Text style={[{
                marginLeft: 55,
                marginTop: 12
              },
                loginText]}>
                E-mail Address
                </Text>
              {/* border color is the color line under the Input component */}
              <Item style={{ marginLeft: 50, marginRight: 50, borderColor: '#3399CC' }}>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder={'username'}
                  inputFontSize={10}
                  inputHeightBase={10}
                  //lineHeight={10}
                  returnKeyType="next"
                  onChangeText={txt => this.setState({ username: txt })}
                  value={username}
                  maxLength={50}
                />
              </Item>

              <Text style={[{
                marginLeft: 55,
                marginTop: 12
              },
                loginText]}>
                Password
                </Text>

              <Item style={{ marginBottom: 5, marginLeft: 50, marginRight: 50, borderColor: '#3399CC' }}>
                <Input
                  placeholder={'password'}
                  inputHeightBase={10}
                  inputFontSize={10}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  onChangeText={txt => this.setState({ password: txt })}
                  value={password}
                  maxLength={20}
                />
              </Item>
              {this.renderError()}
              <TouchableHighlight
                disabled={false}
                style={loginButton}
                onPress={this.handleLogin.bind(this)}
              >
                <Text style={loginButtonText}>SIGN IN</Text>
              </TouchableHighlight>

              <View style={{ flexDirection: 'row' }}>
                <Text style={[loginText,
                  {
                    marginLeft: 150,
                    marginTop: -5
                  }]}>
                  Forgot password ?
              </Text>

                <TouchableHighlight
                  disabled={false}
                  style={findButton}
                  onPress={() => { console.log('hit') }}
                >
                  <Text style={findButtonText}>FIND IT</Text>
                </TouchableHighlight>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={[loginText,
                  {
                    marginLeft: 109,
                  }]}>
                  Do not have an account ?
              </Text>

                <TouchableHighlight
                  disabled={false}
                  style={signUpButton}
                  onPress={this.onHandleRegister.bind(this)} // set state to true
                >
                  <Text style={signUpButtonText}>SIGN UP</Text>
                </TouchableHighlight>
              </View>

            </View>
          </View>
        </View>
      </ScrollView >
    );
  }
}

export default connect(state => ({
  isLoginSuccess: state.LoginReducer.isLoginSuccess,
  registerEnter: state.LoginReducer.registerEnter,
  username: state.LoginReducer.username,
  password: state.LoginReducer.password
}))(Login);