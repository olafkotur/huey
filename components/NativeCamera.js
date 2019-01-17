import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, CameraRoll } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';

import styles from "../Styles";

export default class NativeCamera extends React.Component {

	state = {
		cameraPermission: null,
		cameraType: Camera.Constants.Type.back,
		isRecording: false,
		videoUri: null,
	}


	componentWillMount = async () => {
		// Orientation Lock
		Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);

		// Ask Permissions
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({
			cameraPermission: status === 'granted',
		});
	}


	// Toggles front and back cameras
	toggleCamera = () => {
		if (this.state.cameraType === 1) { // Back
			this.setState({cameraType: Camera.Constants.Type.front})
		}
		else {
			this.setState({cameraType: Camera.Constants.Type.back})
		}
	}


	// Takes a photo and stores it
	capturePhoto = async () => {
		if (this.camera) {
			let photo = await this.camera.takePictureAsync();
			this.saveLocally(photo.uri);
		}
	}


	// Takes a video and stores is
	captureVideo = async () => {
		if (this.state.isRecording === false) {
			var video = this.camera.recordAsync().then((file) => {
				this.saveLocally(file.uri);
			});
		}
		else if (this.state.isRecording === true) {
			this.camera.stopRecording();
		}
		this.setState({isRecording: !this.state.isRecording});
	}


	// Saves specified uri to the camera roll
	saveLocally = (uri) => {
		CameraRoll.saveToCameraRoll(uri);
	}


	render() {

		// Camera Access Denied
		if (this.state.cameraPermission === null || this.state.cameraPermission === false) {
			return (
				<View style = {styles.container}>
					<Text>No access to camera</Text>
				</View>
			);
		}

		// Camera Access Granted
		else {
			return (
				<View style = {styles.container}>

					{/* Camera Background */}
					<Camera 
						ref = { ref => { this.camera = ref; }} 
						style = { styles.cameraContainer } 
						type = {this.state.cameraType} >
					</Camera>

					{/* Toggle Camera */}
					<View style = {styles.headingContainer}>
						<TouchableOpacity
							style = {styles.devButtonSmall}
							onPress = {() => this.toggleCamera()} >
						</TouchableOpacity>
					</View>

					{/* Capture Image */}
					<TouchableOpacity
						style = {styles.imageButton} 
						onPress = {() => this.capturePhoto()} >
					</TouchableOpacity>

					{/* Capture Video */}
					<TouchableOpacity
						style = {styles.videoButton} 
						onPress = {() => this.captureVideo()} >
					</TouchableOpacity>

				</View>
			);
		}
	}
}