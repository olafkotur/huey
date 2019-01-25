import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { FileSystem } from 'expo';

import styles from "../Styles";

export default class FocusedImage extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: true,
	}

	state = {
		uri: '',
		isProccesing: true
	}

	componentWillMount = async () => {
		// Grabs image from local storage
		const fileName = this.props.navigation.getParam('uri', '').split('media%2F').pop().split('?')[0];
		const uri = FileSystem.documentDirectory + fileName;
		this.setState({uri: uri, isProcessing: false});
	}

	render() {
		if (this.state.isProcessing) return null;
		else {
			return (
				<Image
					style = {styles.focusedGalleryImage}
					source = {{uri: this.state.uri}} >
				</Image>
			);
		}
	}
}
