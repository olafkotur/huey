import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, CameraRoll, Dimensions, WebView, Linking} from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import DropdownAlert from 'react-native-dropdownalert';
import * as firebase from "firebase";

import styles from "../Styles";
import FileHandler from './FileHandler';

export default class NativeCamera extends React.Component {

	state = {
		consentGiven: false,
    hasInfoBeenClicked: false
	}


	componentDidMount = async () => {
		// Orientation Lock
		Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);
    this.state.consentGiven = True
    this.state.hasInfoBeenClicked = True
    this.dropdown.alertWithType('success', 'Consent Is Required', 'Please Take The Time To Read Our Prviacy & Ethics Policy')
	}


	// Toggles front and back cameras
	infoRequest = async () => {
    this.setState({hasInfoBeenClicked: true})
    Linking.openURL('https://thehueyproject.wordpress.com/2019/02/02/huey-pre-registration-policy/').catch((err) => console.error('An error occurred', err));
	}

  returnHomeandDelete = async() => {
    await firebase
    .auth().currentUser.delete().then(function() {}).catch(function(error) {});
    this.props.navigation.navigate('LoginScreen')
    //.auth().currentUser.delete().then(function() {}).catch(function(error) {})
  }

  processNextStep = async() => {
    if (this.state.hasInfoBeenClicked == true)
    {
      this.props.navigation.navigate('HomeScreen')
    }
    else
    {
      this.dropdown.alertWithType('error', 'This Is Important Friend', "We Need You To Check Out The Privacy & Ethic Policy First")
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
                onPress = {() => this.returnHomeandDelete()} >
                <Icon name="arrow-back" style = {styles.topLeftButtonIcon} />
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.topMiddleButton}
                onPress = {() => this.infoRequest()} >
                <Icon name="info" style = {styles.topLeftButtonIcon} />
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.topRightButton}
                onPress = {() => this.processNextStep()} >
                <Icon name="tick" style = {styles.topLeftButtonIcon} />
            </TouchableOpacity>
            <Text>
            {
            "We'll Need Your Consent Now: Hit Info Above To Head Through To Our Ethics & Prviacy Policy"
            }
            </Text>
        </View>
			);
	}
}
