import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, CameraRoll } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from "../Styles";
import FileHandler from './FileHandler';

export default class NativeCamera extends React.Component {

	state = {
		cameraPermission: null,
		cameraType: Camera.Constants.Type.back,
		isRecording: false,
		blinkStyle: styles.blinkFalse,
	}


	componentWillMount = async () => {
		// Orientation Lock
		Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);

		// Ask Permissions
		await Permissions.askAsync(Permissions.AUDIO_RECORDING);
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
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
	}


	// Capture video or photo
	captureMedia = async (action) => {
		// Stop Recording if active
		if (this.state.isRecording === true) {
			this.camera.stopRecording();
			this.setState({isRecording: false});
		}

		// Capture photo
		else if (action === 'photo' && this.camera) {
			let options = {quality: 0.1}
			try {
				this.setState({blinkStyle: styles.blinkTrue});
				await this.camera.takePictureAsync(options).then((file) => {
					// Flashes screen
					setTimeout(() => {
						this.setState({blinkStyle: styles.blinkFalse});
					}, 150);
					this.saveLocally(file.uri);

				});
			} catch (error) {
				console.log(error.message);
			}
		}

		// Capture video
		else if (action === 'video' && this.state.isRecording === false && this.camera) {
			try {
				await this.camera.recordAsync().then((file) => {
					this.saveLocally(file.uri);
				});
				this.setState({isRecording: true});
			} catch (error) {
				console.log(error.message);
			}
		}
	}


	// Saves specified uri to the camera roll
	saveLocally = (uri) => {
		const name = Date.now().toString() + '.png' ;
		Handler = new FileHandler();
		Handler.uploadMedia(uri, name);
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
				<View style = {this.state.blinkStyle}>

					{/* Camera Background */}
					<Camera
						ref = { ref => { this.camera = ref; }}
						style = {styles.cameraContainer}
						ratio = {"16:9"}
						type = {this.state.cameraType} >
					</Camera>

					{/* Toggle Camera */}
					<View style = {styles.flipCameraButton}>
						<TouchableOpacity
							onPress = {() => this.toggleCamera()} >
							<Icon name="switch-camera" style = {styles.flipCamera}  size = {30} />
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						style = {styles.captureButton}
						onPress = {() => this.captureMedia('photo')} 
						onLongPress = {() => this.captureMedia('video')} >
					</TouchableOpacity>

				</View>
			);
		}
	}
}
