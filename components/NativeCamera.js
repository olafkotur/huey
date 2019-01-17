import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';

import styles from "../Styles";

export default class NativeCamera extends React.Component {

	state = {
		cameraPermission: null,
		cameraType: Camera.Constants.Type.front,
	}


	componentWillMount = async () => {
		// Orientation Lock
		Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);

		// Camera Permissions
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({cameraPermission: status === 'granted'});
	}


	// Toggles front and back cameras
	toggleCamera = () => {
		if (this.state.cameraType === 1) { // Back
			this.setState({cameraType: Camera.Constants.Type.front})
		}
		else {
			this.setState({cameraType: Camera.Constants.Type.back})
		}

		console.log(this.state.cameraType);
	}


	// Takes a photo and stores it
	capturePhoto = async () => {
		if (this.camera) {
			let photo = await this.camera.takePictureAsync();
			// Error handling
		}
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
				<View style = {styles.nativeCameraParentContainer}>

					{/* Camera Background */}
					<Camera 
						ref = { ref => { this.camera = ref; }} 
						style = { styles.testCameraContainer } 
						type = {this.state.cameraType}
						useCamera2Api = {true} >
					</Camera>

					{/* Toggle Camera */}
					<View style = {styles.testHeadingContainer}>
						<TouchableOpacity
							style = {styles.testDevButtonSmall}
							onPress = {() => this.toggleCamera()} >
						</TouchableOpacity>
					</View>

					{/* Capture */}
					<TouchableOpacity
						style = {styles.testCaptureButton} 
						onPress = {() => this.capturePhoto()} >
					</TouchableOpacity>

				</View>
			);
		}
	}
}