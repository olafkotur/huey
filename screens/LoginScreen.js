import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";

import styles from "../Styles";
import logo from "../static/logo.png";

export default class LoginScreen extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {
		
		email: 'olafkotur97@gmail.com',
		password: 'hueyTest123',

		errorCode: '',
	}

	// Authenticates with firebase and sends user to home screen if successful
	handleLogin = async () => {

	}

	// Creates a new user with firebase and sends user to home screen if successful
	handleSignUp = async () => {
		await firebase
		.auth()
		.createUserWithEmailAndPassword(this.state.email, this.state.password)
		.then(() => this.props.navigation.navigate('HomeScreen'))
		.catch(error => this.setState({errorCode: error.code}))
		console.log(this.state.errorCode)
	}

	render() {
		return (
			<View style = {styles.container}>
				

				{/* Logo */}
				<Image
					style = {styles.loginLogo}
					source = {logo} >
				</Image>


				{/* Login fields */}
				<TextInput
					style = {styles.loginTextField}
					secureTextEntry = {false}
					placeholder = 'email'
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
					placeholder = 'password'
					placeholderTextColor = '#a9a9a9'
					underlineColorAndroid = 'rgba(0,0,0,0)'
					value = {this.state.password}
					onChangeText = {(password) => this.setState({password})}
					keyboardType = 'default'
					autoCapitalize = 'none' >
				</TextInput>

				{/* Forgot Password */}
				<View style = {styles.textContainerRight}>
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
						<Text style = {styles.blackButtonText}>Sign Up</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress = {() => this.handleLogin()} 
						style = {styles.loginButton}>
						<Text style = {styles.whiteButtonText}>Login</Text>
					</TouchableOpacity>

				</View>


			</View>
		);
	}
}