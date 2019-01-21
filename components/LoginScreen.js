import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import { KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropdownAlert from 'react-native-dropdownalert';

import styles from "../Styles";
import logo from "../static/logo.png";

export default class LoginScreen extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {

		email: 'hueyyapp@gmail.com',
		password: 'Testing1123',

	}

	// Creates a new user with firebase and sends user to home screen if successful
	handleSignUp = async () => {
		await firebase
		.auth()
		.createUserWithEmailAndPassword(this.state.email, this.state.password)
		.catch((error) => this.dropdown.alertWithType('error', 'Error', error.message))
		.then(() => {this.props.navigation.navigate('HomeScreen')})
		/*.then(() => {
			this.props.navigation.navigate('HomeScreen'),
			this.dropdown.alertWithType('success', 'Welcome',"Love Is At The Root Of Our Resistance - CK"););*/
		}
	}

	// Authenticates with firebase and sends user to home screen if successful
	handleLogin = async () => {
		await firebase
		.auth()
		.signInWithEmailAndPassword(this.state.email, this.state.password)
		.catch((error) => this.dropdown.alertWithType('error', 'Error', error.message))
		.then(() => {this.props.navigation.navigate('HomeScreen')})
		/*.then(() => {
			this.props.navigation.navigate('HomeScreen'),
			this.dropdown.alertWithType('success', 'Success',"You Can't Jail The Revolustion - FH"););*/
		}
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

				<KeyboardAvoidingView style={styles.containerLight} behavior="padding" enabled>

				{/* Logo */}
				<Image
					style = {styles.loginLogo}
					source = {logo} >
				</Image>

				<Text style = {styles.loginText}>
					Please Sign up or Login.
				</Text>

					{/* Login fields */}
					<TextInput
						style = {styles.loginTextField}
						secureTextEntry = {false}
						placeholder = 'Email'
						placeholderTextColor = '#a9a9a9'
						underlineColorAndroid = 'rgba(0,0,0,0)'
						value = {this.state.email}
						onChangeText = {(email) => this.setState({email})}
						keyboardType = 'email-address'
						autoCapitalize = 'none' >
					</TextInput>

					<TextInput
						style = {styles.loginTextField}
						secureTextEntry = {true}
						placeholder = 'Password'
						placeholderTextColor = '#a9a9a9'
						underlineColorAndroid = 'rgba(0,0,0,0)'
						value = {this.state.password}
						onChangeText = {(password) => this.setState({password})}
						keyboardType = 'default'
						autoCapitalize = 'none' >
					</TextInput>

				{/* Forgot Password */}
				<View>
					<Text
						style = {styles.forgotPassword}
						onPress = {() => this.props.navigation.navigate('ForgotPassword')}>
						Forgot Password?
					</Text>
				</View>

				{/* Sign up / Login */}
				<View style = {styles.doubleButtonContainer}>

					<TouchableOpacity
						onPress = {() => this.handleSignUp()}
						style = {styles.signupButton}>
						<Text style = {styles.darkButtonText}>		Sign Up		</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress = {() => this.handleLogin()}
						style = {styles.loginButton}>
						<Text style = {styles.whiteButtonText}>		Login 		</Text>
					</TouchableOpacity>

				</View>
				</KeyboardAvoidingView>

				<DropdownAlert ref={ref => this.dropdown = ref} />

			</KeyboardAwareScrollView>
		);
	}
}
