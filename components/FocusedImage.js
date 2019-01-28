import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { FileSystem, Video } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from "../Styles";

export default class FocusedImage extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: true,
	}

	state = {
		uri: '',
		fileType: '',
		isProccesing: true,
		shouldPlay: '',
		playIcon: '',
	}

	componentWillMount = async () => {
		// Grabs image from local storage
		const fileName = this.props.navigation.getParam('uri', '').split('media%2F').pop().split('?')[0];
		const uri = FileSystem.documentDirectory + fileName;
		this.setState({
			uri: uri, 
			isProcessing: false,
			fileType: this.props.navigation.getParam('fileType', ''),
			shouldPlay: true,
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
				<View>
					<Video
						source = {{ uri: this.state.uri }}
						rate = {1.0}
						volume = {1.0}
						isMuted = {true}
						shouldPlay = {this.state.shouldPlay}
						resizeMode = 'cover'
						isLooping
						style = {styles.focusedGalleryImage} >
					</Video>

					<View style = {styles.videoButtonContainer}>
						<TouchableOpacity>
							<Icon name= "play-circle-filled" style = {styles.videoControl}  size = {30} />
						</TouchableOpacity>
					</View>
				</View>
			);
		}
	}
}
