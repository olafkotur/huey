import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from "../Styles";
import logo from "../static/logo.png";

export default class ForgotPassword extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {
		
		email: ''
	}

	// Sends a request to firebase to reset password
	handleForgottenPassword = async () => {
		firebase
		.auth()
		.sendPasswordResetEmail(this.state.email)
		.then(this.props.navigation.navigate('LoginScreen'))
		.catch(error => this.setState({errorCode: error.code}))
		console.log(this.state.errorCode)
	}

	render() {
		return (
			<KeyboardAwareScrollView
				contentContainerStyle = {styles.containerLight}
				//keyboardDismissMode = 'on-drag'
				//keyboardShouldPersistTaps = 'never'
				scrollEnabled = {true} 
				enableAutomaticScroll = {true}
				>


				<KeyboardAvoidingView style = {styles.containerLight} behavior="padding" enabled>
					{/* Logo */}
					<Image
						style = {styles.loginLogo}
						source = {logo} >
					</Image>

					<Text style = {styles.loginText}>
						Enter your email address below.
					</Text>

					<Text style = {styles.loginText}>
						 You will get a message shortly to reset your password.
					</Text>

					{/* Login fields */}
					<TextInput
						style = {styles.loginTextField}
						secureTextEntry = {false}
						placeholder = 'Email Address'
						placeholderTextColor = '#a9a9a9'
						underlineColorAndroid = 'rgba(0,0,0,0)'
						value = {this.state.email}
						onChangeText = {(email) => this.setState({email})}
						keyboardType = 'email-address'
						autoCapitalize = 'none' >
					</TextInput>


					{/* Reset Password Button */}
					<TouchableOpacity
						onPress = {() => this.handleForgottenPassword()} 
						style = {styles.resetButton}>
						<Text style = {styles.whiteButtonText}>Reset Password</Text>
					</TouchableOpacity>


					{/* Cancel */}
					<Text 
						style = {styles.cancelText} 
						onPress = {() => this.props.navigation.navigate('LoginScreen')}>
						Cancel
					</Text>

				</KeyboardAvoidingView>
					
			</KeyboardAwareScrollView>

		);
	}
}