import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, CameraRoll, Dimensions } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';

import styles from "../Styles";
import FileHandler from './FileHandler';

export default class NativeCamera extends React.Component {

	state = {
		consentGiven: false
	}


	componentDidMount = async () => {
		// Orientation Lock
		Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);
    this.dropdown.alertWithType('success', 'Consent Is Required', 'Please Take The Time To Read Our Prviacy & Ethics Policy')
	}


	// Toggles front and back cameras
	toggleConsent = async () => {
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
			return (
        <View style = {styles.container}>
            <TouchableOpacity
                style = {styles.topLeftButton}
                onPress = {() => this.props.navigation.navigate('LoginScreen')} >
                <Icon name="arrow-back" style = {styles.topLeftButtonIcon} />
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.topRightButton}
                onPress = {() => this.props.navigation.navigate('HomeScreen')} >
                <Icon name="rocket" style = {styles.topLeftButtonIcon} />
            </TouchableOpacity>
            <Text>
            {
            "https://thehueyproject.wordpress.com/2019/02/02/huey-pre-registration-policy/"
            }
            </Text>
        </View>
			);
	}
}
