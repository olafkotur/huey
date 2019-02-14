import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity,  StatusBar, Platform } from 'react-native';
import { ScreenOrientation } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropdownAlert from 'react-native-dropdownalert';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
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
		dailyStatus: 'Love Is The Root Of Our Resistance - CP',
	 	gestureName: 'none',
	}


	//Swipe Gesture Control
	onSwipeUp(gestureState) {
	}
	onSwipeDown(gestureState) {
		this.props.navigation.navigate('SettingsScreen');
	}
	onSwipeLeft(gestureState) {
		this.props.navigation.navigate('MediaGallery');
	}
	onSwipeRight(gestureState) {
		this.props.navigation.navigate('NativeAudio');
	}
	onSwipe(gestureName, gestureState) {
		const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
		this.setState({gestureName: gestureName});
		switch (gestureName) {
		  case SWIPE_UP:
		    break;
		  case SWIPE_DOWN:
		    break;
		  case SWIPE_LEFT:
		    break;
		  case SWIPE_RIGHT:
		    break;
		}
	}

	// Quote of the day
	componentDidMount = async () => {
		// Lock orientation
		ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);

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

		const config = {
	      velocityThreshold: 0.3,
	      directionalOffsetThreshold: 80
	    };

		return (
			<GestureRecognizer
				onSwipe={(direction, state) => this.onSwipe(direction, state)}
				onSwipeUp={(state) => this.onSwipeUp(state)}
				onSwipeDown={(state) => this.onSwipeDown(state)}
				onSwipeLeft={(state) => this.onSwipeLeft(state)}
				onSwipeRight={(state) => this.onSwipeRight(state)}
				config={config}
				style = {{flex:1, backgroundColor: "#27ae60"}}
			>
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

					<NativeCamera/>

					<DropdownAlert
						ref={ref => this.dropdown = ref}
						containerStyle = {{backgroundColor: '#27ae60'}}
						activeStatusBarBackgroundColor = {'#27ae60'}
					/>

				</View>
			</GestureRecognizer>
		);
	}
}
