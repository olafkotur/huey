import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FileSystem } from 'expo';

import styles from "../Styles";
import FileHandler from './FileHandler';

export default class GalleryImage extends React.Component {

	state = {
		uri: '',
		isProcessing: true
	}

	componentWillMount = async () => {
		// Grabs image from local storage
		Handler = new FileHandler();
		const fileName = this.props.uri.split('media%2F').pop().split('?')[0];
		const uri = await Handler.getLocalFile(fileName, this.props.uri);
		this.setState({uri: uri, isProcessing: false});
	}

	render() {
		if (this.state.isProcessing) return null;
		else {
			return (
				<Image
					style = {styles.singleGalleryImage}
					source = {{uri: this.state.uri}} >
				</Image>
			);
		}
	}
}
