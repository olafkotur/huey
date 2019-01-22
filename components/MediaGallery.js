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
		mediaData: []
	}

	componentDidMount = () => {
		this.fetchData();
	}


	// Fetches image gallery data
	fetchData = async () => {
		Handler = new FileHandler();
		await Handler.getMedia().then((data) => this.setState({mediaData: data}));
	}

	renderImage = (item) => {
		return (
			<Image 
				style = {styles.singleGalleryImage}
				source = {{uri: item.url}} >
			</Image>
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
						data = {this.state.mediaData}
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