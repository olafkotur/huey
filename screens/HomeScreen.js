import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

import styles from "../Styles";
import logo from "../static/logo.png";

export default class HomeScreen extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {
		
	}

	render() {
		return (
			<View style = {styles.container}>
				

				{/* Logo */}
				<Image
					style = {styles.loginLogo}
					source = {logo} >
				</Image>


			</View>
		);
	}
}