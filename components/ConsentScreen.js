import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, CameraRoll, Dimensions, WebView, Linking, ScrollView} from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import DropdownAlert from 'react-native-dropdownalert';
import * as firebase from "firebase";

import styles from "../Styles";
import FileHandler from './FileHandler';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

export default class ConsentScreen extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {
		consentGiven: false,
        hasInfoBeenClicked: false,
        acceptEnabled: false,
        acceptButtonStyle: styles.consentAcceptDisabled,
	}


	componentDidMount = async () => {
		// Orientation Lock
		Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);
        this.state.consentGiven = false
        this.state.hasInfoBeenClicked = false
        this.state.acceptEnabled = false
	}


	// Handles Pressing The Info Button
	infoRequest = async () => {
    this.setState({hasInfoBeenClicked: true})
    Linking.openURL('https://thehueyproject.wordpress.com/2019/02/02/huey-pre-registration-policy/').catch((err) => console.error('An error occurred', err));
	}

	// Handles The Account Deletion & Pressing Of The Return
  returnHomeandDelete = async() => {
    
    //----------------------------------------------------------------------------------------------------------------------------
    //PROBABLY DONT UNCOMMENT THIS IT NEEDS TO BE FIXED SO ACCOUNTS ARE ONLY CREATED AFTER ACCEPTING INSTEAD OF CREATING THEN DELETING THE ACCOUNT
    //await firebase
    //.auth().currentUser.delete().then(function() {}).catch(function(error) {});
    //---------------------------------------------------------------------------------------------------------------------------
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
        <View style = {styles.containerLight}>

            <View style = {{marginTop : 10}}>
            <Text 
                style = {styles.consentTopText} >
                To continue, please read and accept our Privacy Policy:
            </Text>
            </View>

            <ScrollView 
                style = {styles.consentScrollView}
                onScroll={ ({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        this.setState({acceptButtonStyle: styles.consentAccept, acceptEnabled: true});
                        }
                    }
                }
            >
                <Text style = {styles.consentText}>
                    Huey is a system designed by activists for activists, whatever your values or beliefs may be our mutual contract with our users consists of the following expectations and commitments:

                    {'\n'}We (from here in meaning the Huey Team):
                    {'\n'}
                    {'\n'}Will not provide your e-mail to any 3rd Parties for any purpose, your e-mail is only taken for restoring access following password loss, preventing spam-registration and for generating a unique non-personally identifiable Unique Identifier through which Huey provides services to you.

                    {'\n'}This Unique Identifier takes no additional information beyond your e-mail and applies a one-way abstraction function. This creates a virtual user-identity to access Huey’s services which we use to recognise you in place of any personal information directly associated with you.

                    {'\n'}By merit of the content taken on this platform, you may intentionally or unintentionally create content that identifies specific individuals but current law in the US & UK confirms the unrestricted right of all citizens to record other individuals in a public space. While exercising this right, We do not encourage you to break any applicable law in your context of residence, and expect all users to confirm that they use Huey in full accordance with both their own personal moral beliefs and the legal context of their situation.

                    {'\n'}For the purposes of validation, some protest organisers may seek to confirm your presence via use of location services. Your exact location is not stored on our servers and is only compared with the expected location shared by protest organisers. We will never store your location data itself and will only record a true/false confirmation of your presence within a given radius of the specified protest and a log of the time that this was confirmed.

                    {'\n'}We will never inspect the content that you backup onto your private repositories on the platforms, but content that you choose to ‘Share’ to event organisers is shared with a free licence and expectation that it may be freely circulated. You are entirely responsible, for the nature and substance of the content that you share to 3rd Parties through the Huey system but your back-up will always remain private.

                    {'\n'}The current hosting of Huey uses Google’s Firebase as a backend to store account information and content fulfilling the definition of a Data Processor under GDPR. For all purposes We are responsible as a Data Controllers & Co-Processors to ensure the security, control transmission and regulate the use of any content backed up via Huey any updates to this relationship will require a renewal of consent with yourself and our wider user-base.

                    {'\n'}Hoping that you are committed to upholding the principles of the Huey system as detailed above and requiring that you leave the platform should you feel unable to maintain this contract, we look forward to welcoming to the Huey community,

                    {'\n'}The Huey Team.
                </Text>
            </ScrollView>

            <View style = {styles.consentButtons}>

                {/* Accepts */}
                <View pointerEvents = {this.state.acceptEnabled ? 'auto' : 'none'}
                    style = {this.state.acceptButtonStyle}>
                    <TouchableOpacity
                        onPress = {() => this.props.navigation.navigate('HomeScreen')}
                        >
                        <Text style = {styles.whiteButtonText}>      Accept     </Text>
                    </TouchableOpacity>
                </View>

                {/* Cancel */}
                <Text 
                    style = {styles.cancelText} 
                    onPress = {() => this.props.navigation.navigate('LoginScreen')}>
                    Cancel
                </Text>

            </View>

        </View>
			);
	}
}
