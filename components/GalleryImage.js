import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import styles from "../Styles";

export default class GalleryImage extends React.Component {

	render() {
		return (
			<Image 
				style = {styles.singleGalleryImage}
				source = {{uri: this.props.uri}} >
			</Image>
		);
	}
}