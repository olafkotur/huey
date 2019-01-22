import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from "../Styles";
import FileHandler from './FileHandler';

export default class MediaGallery extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {
		imageData: [
			{
				key: 'A'
			},
			{
				key: 'B'
			},
			{
				key: 'C'
			}
		]
	}

	renderImage = (item) => {
		return (
			<View style = {styles.singleImageContainer}>
				<Text style = {{fontSize: 30}}>{item.key}</Text>
			</View>
		);
	}

	render() {
		return (
			<View style = {styles.container}>

				<TouchableOpacity
					style = {styles.topLeftButton} 
					onPress = {() => this.props.navigation.navigate('HomeScreen')} >
					<Icon name="arrow-back" style = {{color: '#000'}}  size = {30} />
				</TouchableOpacity>

				<View style = {styles.galleryContainer}>
					<FlatList
						data = {this.state.imageData}
						extraData = {this.state}
						horiztonal = {true}
						keyExtractor = {(item, index) => index.toString()}
      					renderItem = {({item}) => this.renderImage(item)}>
					</FlatList>
				</View>

			</View>
		);
	}
}