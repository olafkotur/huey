import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity,  StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import DropdownAlert from 'react-native-dropdownalert';
import * as Progress from 'react-native-progress';

import NativeCamera from './NativeCamera.js';
import styles from "../Styles";
import logo from "../static/logo.png";


export default class HomeScreen extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {
		welcomeMessage: 'Love Is The Root Of Our Resistance'
	}

	// Authenticates with firebase and sends user to home screen if successful
	loadingMessage = async () => {
		(messageForUser) => this.dropdown.alertWithType('success', 'Welcome', 'Love Is The Root Of Our Resistance - CP')
	}

	render() {
		return (
			<View style = {styles.container}>
				<StatusBar hidden = {(Platform.OS === 'ios') ? true : false} />

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

        <TouchableOpacity
          style = {styles.audioButton}
          onPress = {() => {
            this.props.navigation.navigate('NativeAudio'),
            console.log('hello')
          }}>
          <Icon name="mic" style = {{color: '#fff'}}  size = {30} />
        </TouchableOpacity>

				<NativeCamera />

				<DropdownAlert ref={ref => this.dropdown = ref} />

			</View>
		);
	}
}
