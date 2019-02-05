import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, CameraRoll, Dimensions, WebView, Linking} from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import DropdownAlert from 'react-native-dropdownalert';
import * as firebase from "firebase";

import styles from "../Styles";
import FileHandler from './FileHandler';

export default class ConsentScreen extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {
		consentGiven: false,
    hasInfoBeenClicked: false
	}


	componentDidMount = async () => {
		// Orientation Lock
		Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);
    this.state.consentGiven = false
    this.state.hasInfoBeenClicked = false
    this.dropdown.alertWithType('success', 'Consent Is Required', 'Please Take The Time To Read Our Prviacy & Ethics Policy')
	}


	// Handles Pressing The Info Button
	infoRequest = async () => {
    this.setState({hasInfoBeenClicked: true})
    Linking.openURL('https://thehueyproject.wordpress.com/2019/02/02/huey-pre-registration-policy/').catch((err) => console.error('An error occurred', err));
	}

	// Handles The Account Deletion & Pressing Of The Return
  returnHomeandDelete = async() => {
    await firebase
    .auth().currentUser.delete().then(function() {}).catch(function(error) {});
    this.props.navigation.navigate('LoginScreen')
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
                <Icon name="stars" style = {styles.topLeftButtonIcon} />
            </TouchableOpacity>
            <Text>
            {
            "We'll Need Your Consent Now: Hit Info Above To Head Through To Our Ethics "
            }
            </Text>

						<DropdownAlert ref={ref => this.dropdown = ref} />

        </View>
			);
	}
}
