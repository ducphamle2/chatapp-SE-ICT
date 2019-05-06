import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		marginLeft: 12,
		fontSize: 16,
	},
	photo: {
		height: 40,
		width: 40,
		borderRadius: 20,
	},
});

const data = ['Duc Pham le', 'Hong Anh Nguyen'];

/* tutorial for using FlatList: https://www.youtube.com/watch?v=NZMp5JLSIAM
	 It has two main props: data and renderItem.
	 For renderItem it needs to receive an arrow function with two params: item & index of the item
*/
export default class Home extends Component {
	render() {
		return (
			<View style={(styles.container)}>
				<FlatList
					data={data}
					renderItem={(item, index) => {
						console.log('Item: ', item.item); //item is an object which consists of item name, item index, ...
						console.log('index: ', item.index);
					}}
				>
				</FlatList>
			</View>
		);
	}
}