import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import NativeCamera from './NativeCamera.js';
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

				<NativeCamera />

			</View>
		);
	}
}