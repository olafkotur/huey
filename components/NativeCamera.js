import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, CameraRoll } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';

import styles from "../Styles";
import Icon from 'react-native-vector-icons/MaterialIcons'

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
		// if (this.camera) {
		// 	let photo = await this.camera.takePictureAsync();
		// 	this.saveLocally(photo.uri);
		// }
		console.log('Taking Photo');
	}


	// Takes a video and stores is
	captureVideo = async () => {
		// if (this.state.isRecording === false) {
		// 	var video = this.camera.recordAsync().then((file) => {
		// 		this.saveLocally(file.uri);
		// 	});
		// }
		// else if (this.state.isRecording === true) {
		// 	this.camera.stopRecording();
		// }
		// this.setState({isRecording: !this.state.isRecording});
		console.log('Recording Video');
	}

	capture = async (action) => {
		if (this.state.isRecording === true) {
			this.camera.stopRecording();
			this.setState({isRecording: false});
		}
		else if (action === 'photo') {
			if (this.camera) {
				try {
					await this.camera.takePictureAsync().then((file) => {
						this.saveLocally(file.uri);
					});
				} catch (error) {
					console.log(error.message);
				}
 			}
		}
		else if (action === 'video') {
			if (this.state.isRecording === false) {
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
				<View style = {styles.cameraParentContainer}>

					{/* Camera Background */}
					<Camera
						ref = { ref => { this.camera = ref; }}
						style = { styles.cameraContainer }
						type = {this.state.cameraType} >
					</Camera>

					{/* Toggle Camera */}
					<View style = {styles.headingContainer}>
						<TouchableOpacity
							onPress = {() => this.toggleCamera()} >
							<Icon name="autorenew" style = {styles.flipCamera}  size = {30} />
						</TouchableOpacity>
					</View>

					{/* Capture */}
					<TouchableOpacity
						style = {styles.imageButton}
						onPress = {() => this.capture('photo')} 
						onLongPress = {() => this.capture('video')} >
            			<Icon name="camera" style = {styles.shutterIcon} allowFontScaling={false} />
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
