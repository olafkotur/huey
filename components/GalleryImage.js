import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FileSystem, Video } from 'expo';

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

		// Display photo
		else if (this.props.fileType === 'photo') {
			return (
				<Image
					style = {styles.singleGalleryImage}
					source = {{uri: this.state.uri}} >
				</Image>
			);
		}

		// Display video
		else if (this.props.fileType === 'video') {
			return (
				<Video
					source = {{ uri: this.state.uri }}
					rate = {1.0}
					volume = {1.0}
					isMuted = {true}
					resizeMode = 'cover'
					style = {styles.singleGalleryImage} >
				</Video>
			);
		}
	}
}
