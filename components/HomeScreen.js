import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity,  StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import NativeCamera from './NativeCamera.js';
import styles from "../Styles";
import logo from "../static/logo.png";


export default class HomeScreen extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {

	}

	render() {
		return (
			<View style = {styles.container}>
				<StatusBar hidden = {true} />
			
				<TouchableOpacity
					style = {styles.folderButton}
					onPress = {() => this.props.navigation.navigate('MediaGallery')}>
					<Icon name="folder" style = {styles.folderIcon} allowFontScaling={false} />
				</TouchableOpacity>

				<TouchableOpacity
					style = {styles.settingsButton} 
					onPress = {() => this.props.navigation.navigate('SettingsScreen')}>
					<Icon name="settings" style = {styles.settingsIcon} allowFontScaling={false} />
				</TouchableOpacity>

				<NativeCamera />

			</View>
		);
	}
}