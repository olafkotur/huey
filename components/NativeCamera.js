import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, CameraRoll, Dimensions } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';

import styles from "../Styles";
import FileHandler from './FileHandler';

export default class NativeCamera extends React.Component {

	state = {
		cameraPermission: null,
		cameraType: Camera.Constants.Type.back,
		isRecording: false,
		blinkStyle: styles.blinkFalse,
		cameraFlash: Camera.Constants.FlashMode.off,
		flashIcon: "flash-off",
		flipCameraIcon: "camera-rear"
	}


	componentDidMount = async () => {
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
		if (this.state.cameraType === Camera.Constants.Type.back) { // Back
			this.setState({cameraType: Camera.Constants.Type.front})
			this.setState({flipCameraIcon: "camera-front"})
		}
		else {
			this.setState({cameraType: Camera.Constants.Type.back})
			this.setState({flipCameraIcon: "camera-rear"})
		}
	}

	// Toggles flash
	toggleFlash = () => {
		if (this.state.cameraFlash === Camera.Constants.FlashMode.off) { // Back
			this.setState({cameraFlash: Camera.Constants.FlashMode.auto})
			this.setState({flashIcon : "flash-auto"})
		}
		else if (this.state.cameraFlash === Camera.Constants.FlashMode.auto){
			this.setState({cameraFlash: Camera.Constants.FlashMode.on})
			this.setState({flashIcon : "flash-on"})
		}
		else {
			this.setState({cameraFlash: Camera.Constants.FlashMode.off})
			this.setState({flashIcon : "flash-off"})
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
					this.saveInCloud(file.uri, action);
				});
			} catch (error) {
				console.log(error.message);
			}
		}

		// Capture video
		else if (action === 'video' && this.state.isRecording === false && this.camera) {
			try {
				this.setState({isRecording: true});
				await this.camera.recordAsync().then((file) => {
					this.saveLocally(file.uri);
					this.saveInCloud(file.uri);
				});
			} catch (error) {
				console.log(error.message);
			}
		}
	}


	// Saves specified uri to the camera roll
	saveLocally = (uri) => {
		// CameraRoll.saveToCameraRoll(uri);
	}


	// Sends to firebase as backup
	saveInCloud = (uri, action) => {
		const extension = (action === 'photo') ? '.png' : '.mp4';
		const name = Date.now().toString() + extension;
		Handler = new FileHandler();
		Handler.uploadMedia(uri, name);
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
						type = {this.state.cameraType}
						flashMode = {this.state.cameraFlash} >
					</Camera>

					<View style = {styles.swipeOverlay}>
					</View>

					{/*Toggle Flash*/}
					<View style = {this.state.cameraType === Camera.Constants.Type.back ? styles.cameraFlash : styles.cameraFlashDisabled} pointerEvents = {this.state.cameraType == Camera.Constants.Type.back ? 'auto' : 'none'}>
						<TouchableOpacity
							onPress = {() => this.toggleFlash()} >
							<Icon name={this.state.flashIcon} style = {styles.flipCamera}  size = {30} />
						</TouchableOpacity>
					</View>

					{/* Toggle Camera */}
					<View style = {styles.flipCameraButton}>
						<TouchableOpacity
							onPress = {() => this.toggleCamera()}  >
							<Icon name={this.state.flipCameraIcon} style = {styles.flipCamera}  size = {30} />
						</TouchableOpacity>
					</View>


					<TouchableOpacity
						style = {styles.captureButton}
						onPress = {() => this.captureMedia('photo')}
						onLongPress = {() => this.captureMedia('video')} >
					</TouchableOpacity>

					<View style = {styles.captureProgressContainer}>
						<Progress.CircleSnail
							style = {styles.captureProgressCircle}
							color={['#27ae60']}
							spinDuration = {1}
							thickness = {4}
							hidesWhenStopped = {true}
							duration = {1000}
							animating = {this.state.isRecording}
							indeterminate = {true}
							spinDuration = {900}
							size = {Dimensions.get('window').width * 0.18 + 20} >
						</Progress.CircleSnail>
					</View>

				</View>
			);
		}
	}
}
