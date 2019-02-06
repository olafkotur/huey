import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, CameraRoll, Dimensions } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import * as firebase from "firebase";

import styles from "../Styles";
import FileHandler from './FileHandler';

export default class NativeCamera extends React.Component {

	state = {
		cameraPermission: null,
		locationPermission: null,
		cameraType: Camera.Constants.Type.back,
		isRecording: false,
		blinkStyle: styles.blinkFalse,
		cameraFlash: Camera.Constants.FlashMode.off,
		flashIcon: "flash-off",
		flipCameraIcon: "camera-rear",
		oneTimePWValidated: false,
		renewableQRValidated: false,
		locationValidated: false
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

	processQRCode = async (scanneroutput) =>
	{
		//Extract URL From QR Code //Date Form -> NameOfHosst - NumberUID
		codeportion = scanneroutput.data

		output1 = ((await firebase.database().ref('/organisers' + '/' + codeportion.slice(0,13)).once('value')))
		output2 = ((await firebase.database().ref('/protestpassword').once('value')))
		output2original = output2//(0,output2.length)
		output3 = ((codeportion.slice(0,13)))
		output4 = ((codeportion.slice(13,33)))

		console.log('00')
		console.log(codeportion)
		console.log(1)
		console.log(output1.val())
		console.log(2)
		console.log(output2original.val())
		console.log(3)
		console.log(output3)
		console.log(4)
		console.log(output4)

		if(output1.val() == output4)
		{
			this.state.renewableQRValidated = true
			console.log('FOUND INDIVIDUAL QR CODE')
		}
		else if(output2.val() == codeportion)
		{
			this.state.oneTimePWValidated = true
			console.log('AUTHORISED BY ' + output3 + "QR")
		}
		else
		{
				console.log("JUNK QR CODE")
		}

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
			const { locstatus } = await Permissions.askAsync(Permissions.LOCATION)
			this.state.locationPermission = true
			console.log(this.state.locationPermission)
			console.log(this.state.locationValidated)

		// Stop Recording if active
		  position = navigator.geolocation.getCurrentPosition()
			console.log("II")
			console.log(position)
			latitude = position.coords.latitude
		 	longtitude: position.coords.longitude
			lat = (firebase.database().ref('/locationcoordinates/lat').once('value'))
			long = (firebase.database().ref('/locationcoordinates/long').once('value'))
			
					// Test DataSet
					//	locationDataExport = {latitude: 1, longtitude: 1}
					//	long = 1
				  //	lat = 1

			console.log("III")
			console.log(locationDataExport.longitude)
			console.log(locationDataExport.latitude)
			console.log(long)
			console.log(lat)
			console.log("this.state.locationValidated = " + this.state.locationValidated)

			if((lat-1 >= locationDataExport.latitude <= lat+1) && (long-1 >= locationDataExport.longtitude <= long+1))
			{
				this.state.locationValidated = true
			}
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
						flashMode = {this.state.cameraFlash}
						onBarCodeScanned = {(result) => this.processQRCode(result)} >
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
