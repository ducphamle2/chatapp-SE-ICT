import React, { Component } from 'react';
import { Text, View } from 'react-native';
import HomeHeader from '../navigator/HomeHeader'

export default class HelloWorldApp extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Hello, world!</Text>
            </View>
        );
    }
}