import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera, Permissions } from 'expo';

import styles from "../Styles";

export default class NativeCamera extends React.Component {

	state = {
		cameraPermission: null
	}


	componentWillMount = async () => {
		// Orientation Lock
		Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);

		// Camera Permissions
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({cameraPermission: status === 'granted'});
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
					
				</View>
			);
		}
	}
}