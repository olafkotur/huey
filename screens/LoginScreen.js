import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

import styles from "../Styles";
import logo from "../static/logo.png";

export default class LoginScreen extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {
		
		email: "",
		password: ""
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


			</View>
		);
	}
}