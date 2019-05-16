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
  StyleSheet,
  Alert
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
      username: 'ducphamle212@gmail.com',
      password: 'Pabcdef3#',
      //username: '',
      //password: '',
      loginErrorMessage: '',
      color: '#DB1E4A',
      isClicked: false,
    };

    StateUtil.resetState(); // here when we get to Login component, all the states have to be reset.
  }

  // when user hit the login button
  handleLogin() {
    const { username, password } = this.state;
    const payload = { username, password };
    console.log('payload in handle Login: ', payload);
    if (password !== '' && username !== '' && username.length <= 50 && password.length <= 20) {
      const payload = { username, password };
      console.log('payload in handle login: ', payload);
      setTimeout(async () => {
        await api.login(payload, this.onHandle.bind(this));
      }, 200);
    }
    else {
      // check if input are valid or not
      if (username.length > 50 || password.length > 20) {
        this.setState({ loginErrorMessage: 'username or password length is too long (max 50 and 20)' });
      }
      else if (username === '' || password === '') {
        this.setState({ loginErrorMessage: 'Please type username or password' });
      }
      else {
        this.setState({ loginErrorMessage: 'There is something wrong' });
      }
    }
  }

  onHandle(isSuccess, response, error) {
    const { dispatch } = this.props;
    if (isSuccess) {
      console.log('response: ', response);
      // if successfully login
      if (response.request.status === 200) {
        console.log('SUCESSFULLYYYYYYY');
        setTimeout(() => {
          dispatch(LoginAction.setUsername(this.state.username)); // set username to current username for later use
        }, 200);
        dispatch(LoginAction.isLoginSuccess(true)); // set to true to move to Home
      }
    }
    else {
      if (error.request.status === 422) {
        console.log('User does not exist or wrong pass');
        Alert.alert(
          'Notification',
          'User does not exist or wrong pass',
          [
            { text: 'OK', onPress: () => { console.log('OK pressed') }, style: 'cancel' },
          ],
          { cancelable: false }
        );
      }
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
                  fontWeight='bold'
              >
                  <Text style={findButtonText}>FIND IT</Text>
                </TouchableHighlight>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={[loginText,
                  {
                    marginLeft: 130,
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