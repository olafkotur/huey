import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FileSystem } from 'expo';

import styles from "../Styles";

export default class GalleryImage extends React.Component {

	state = {
		uri: '',
		isProcessing: true
	}

	componentWillMount = async () => {
		const fileName = this.props.uri.split('media%2F').pop().split('?')[0];
		const fileUri = FileSystem.documentDirectory + fileName;
		
		// Check if file exists
		await FileSystem.getInfoAsync(fileUri, {}).then((information) => {
			// Use existing
			if (information.exists) {
				this.setState({uri: information.uri, isProcessing: false});
			}
			// Download and cache
			else {
				FileSystem.downloadAsync(this.props.uri, fileUri).then((info) => {
					this.setState({uri: info.uri, isProcessing: false});
				});
			}
		});
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
