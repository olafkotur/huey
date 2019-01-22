import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
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
				key: 'a'
			},
		]
	}

	renderImage = (item) => {
		return (
			<View style = {styles.singleImageContainer}>
				<Image 
					style = {styles.singleImage}
					source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/huey-f5674.appspot.com/o/users%2FwA1j8gOFmSP1tWJf8iENLod7pG23media%2F1548160297848.png?alt=media&token=9a7da041-c025-43d2-aa63-d4ca3ca2e58f'}} >
				</Image>
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
						horiztonal = {false}
						numColumns = {3}
						keyExtractor = {(item, index) => index.toString()}
      					renderItem = {({item}) => this.renderImage(item)}>
					</FlatList>
				</View>

			</View>
		);
	}
}