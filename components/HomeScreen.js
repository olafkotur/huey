import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity,  StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import DropdownAlert from 'react-native-dropdownalert';
import * as Progress from 'react-native-progress';
import * as firebase from "firebase";

import NativeCamera from './NativeCamera.js';
import styles from "../Styles";
import logo from "../static/logo.png";


export default class HomeScreen extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {
		dailyStatus: 'Love Is The Root Of Our Resistance - CP'
	}

	// Quote of the day
	componentDidMount = async () => {
		// Grab all quotes
		await firebase.database().ref('messages').once('value', snapshot => {
			if (snapshot) {
				const messages = Object.values(snapshot.val());
				const random = Math.floor((Math.random() * messages.length) + 0);
				this.setState({dailyStatus: messages[random]});
			}
		});
		this.dropdown.alertWithType('custom', 'Quote For The Week', this.state.dailyStatus)
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
          onPress = {() => this.props.navigation.navigate('NativeAudio')}>
          <Icon name="mic" style = {{color: '#fff'}}  size = {30} />
        </TouchableOpacity>

				<NativeCamera />

				<DropdownAlert 
					ref={ref => this.dropdown = ref} 
					containerStyle = {{backgroundColor: '#27ae60'}} 
					activeStatusBarBackgroundColor = {'#27ae60'}
				/>

			</View>
		);
	}
}
