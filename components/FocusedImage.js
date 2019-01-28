import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { FileSystem, Video } from 'expo';

import styles from "../Styles";

export default class FocusedImage extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: true,
	}

	state = {
		uri: '',
		fileType: '',
		isProccesing: true
	}

	componentWillMount = async () => {
		// Grabs image from local storage
		const fileName = this.props.navigation.getParam('uri', '').split('media%2F').pop().split('?')[0];
		const uri = FileSystem.documentDirectory + fileName;
		this.setState({
			uri: uri, 
			isProcessing: false,
			fileType: this.props.navigation.getParam('fileType', '')
		});
	}

	render() {
		if (this.state.isProcessing) return null;

		// Display photo
		else if (this.state.fileType === 'photo') {
			return (
				<Image
					style = {styles.focusedGalleryImage}
					source = {{uri: this.state.uri}} >
				</Image>
			);
		}

		// Display video
		else if (this.state.fileType === 'video') {
			return (
				<Video
					source = {{ uri: this.state.uri }}
					rate = {1.0}
					volume = {1.0}
					isMuted = {true}
					shouldPlay
					resizeMode = 'cover'
					style = {styles.focusedGalleryImage} >
				</Video>
			);
		}
	}
}
