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
import ActionButton from 'react-native-action-button'; // doc: https://github.com/mastermoo/react-native-action-button

var screen = Dimensions.get('window');

export default class AddModal extends Component {
    constructor(props) {
        super(props);
    }

    showAddModal() {
        this.refs.myModal.open();
    }

    render() {
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
                    alert('Modal closed');
                }}

            >
                <Text>
                    Search an username
                </Text>
            </Modal>
        );
    }
}