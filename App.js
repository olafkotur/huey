import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as firebase from "firebase";

import styles from "./Styles";
import LoginScreen from './screens/LoginScreen';
import ForgotPassword from './screens/ForgotPassword';
import HomeScreen from './screens/HomeScreen';

const AppStack = createStackNavigator({
	LoginScreen: {screen: LoginScreen},
	ForgotPassword: {screen: ForgotPassword},
	HomeScreen: {screen: HomeScreen},
});

const AppRouter = createAppContainer(AppStack);

export default class App extends React.Component {

	// Firebase integration
	componentDidMount = () => {
		var config = {
			apiKey: "AIzaSyDaXzKRSRaNQpNClm6BlQsnAVcejaB3Fek",
			authDomain: "huey-638d9.firebaseapp.com",
			databaseURL: "https://huey-638d9.firebaseio.com",
			projectId: "huey-638d9",
			storageBucket: "huey-638d9.appspot.com",
			messagingSenderId: "421584069747"
		};
		firebase.initializeApp(config);
	}

	// Return screen
	render = () => {
		return (
			<AppRouter />
		);
	}
}