import React from 'react';
import { StyleSheet, Image } from 'react-native';

import styles from "../Styles";

export default class FocusedImage extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: true,
	}

	render() {
		return (
			<Image
				style = {styles.focusedGalleryImage}
				source = {{uri: this.props.navigation.getParam('uri', '')}} >
			</Image>
		);
	}
}
