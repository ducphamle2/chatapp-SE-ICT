import React, { Component } from 'react';
import {
    TouchableHighlight,
    TextInput,
    Dimensions,
    Platform,
    Alert,
    Text,
} from 'react-native';
import Modal from 'react-native-modalbox';
import api from '../config/Api';
import LoginStyle from '../assets/styles/LoginStyle';
import { View, Row } from 'native-base';


var screen = Dimensions.get('window');

export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            addErrorMessage: '',
        }
    }

    showAddModal() {
        this.refs.myModal.open();
    }

    handleAdding() {
        console.log('add button hit !!!');
        const { username } = this.state;
        if (username !== '' && username.length <= 50) {
            this.setState({ addErrorMessage: '' }); // state is reset
            const payload = { username };
            console.log('payload in handle login: ', payload);
            setTimeout(async () => {
                await api.addUser(payload, this.onHandleAddUser.bind(this));
            }, 200);
        }
        else {
            this.setState({ addErrorMessage: 'Invalid username input !' });
        }
    }

    onHandleAddUser(isSuccess, response, error) {

    }


    renderError() {
        const { addErrorMessage } = this.state;
        if (addErrorMessage !== '') {
            return <Text style={{
                marginLeft: 55,
                color: '#DB1E4A',
                fontSize: 12.5,
                marginBottom: 10,
            }}>{addErrorMessage}</Text>;
        }
    }

    render() {
        const { username } = this.state;
        const { loginButtonText, loginButton } = LoginStyle;
        return (
            <Modal
                ref={'myModal'}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 200
                }}
                position='center'
                backdrop={true} // this is used to close when click outside of the box ?
                onClosed={() => {
                    // this makes sure all the states are cleared before rendering
                    this.setState({ username: '', addErrorMessage: ''}) 
                }}

            >
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 40,
                    }}>
                    Adding tool
                </Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1,
                    }}
                    placeholder='Search an username'
                    onChangeText={txt => this.setState({ username: txt })}
                    value={username}
                    maxLength={50}>
                </TextInput>
                {this.renderError()}
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableHighlight
                        disabled={false}
                        style={{
                            width: 60,
                            height: 30,
                            backgroundColor: '#3399CC',
                            shadowColor: '#D2D2D2',
                            shadowOffset: { width: 0, height: 3 },
                            shadowRadius: 6,
                            shadowOpacity: 0.5,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                        onPress={this.handleAdding.bind(this)}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 16,
                            fontFamily: 'Josefin Sans',
                        }}>Add</Text>
                    </TouchableHighlight>
                </View>

            </Modal>
        );
    }
}