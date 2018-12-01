import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

import styles from "../Styles";
import logo from "../static/logo.png";

export default class LoginScreen extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {
		
		email: "olafkotur97@gmail.com",
		password: "hueyTest123"
	}

	// Authenticates with firebase and sends user to home screen if successful
	handleLogin = async () => {

	}

	// Creates a new user with firebase and sends user to home screen if successful
	handleSignUp = async () => {

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


				{/* Sign up / Login */}
				<View style = {styles.doubleButtonContainer}>

					<TouchableOpacity
						onPress = {() => this.handleSignUp()} 
						style = {styles.signupButton}>
						<Text style = {styles.signupButtonText}>Sign Up</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress = {() => this.handleLogin()} 
						style = {styles.loginButton}>
						<Text style = {styles.loginButtonText}>Login</Text>
					</TouchableOpacity>

				</View>


			</View>
		);
	}
}