import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';

import styles from "../Styles";
import GalleryImage from './GalleryImage';
import FileHandler from './FileHandler';

export default class ImageList extends React.Component {

	state = {

	}


	render() {
		return (
			<View style = {styles.galleryTabViewContainer}>	
	  			<Text>MEME</Text>
			</View>
		);
	}
}
