import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as firebase from "firebase";

import styles from "./Styles";
import LoginScreen from './components/LoginScreen';
import ForgotPassword from './components/ForgotPassword';
import HomeScreen from './components/HomeScreen';
import MediaGallery from './components/MediaGallery';
import SettingsScreen from './components/SettingsScreen';
import NativeAudio from './components/NativeAudio';
import FocusedImage from './components/FocusedImage';


const AppStack = createStackNavigator({
	LoginScreen: {screen: LoginScreen},
	ForgotPassword: {screen: ForgotPassword},
	HomeScreen: {screen: HomeScreen},
	MediaGallery: {screen: MediaGallery},
	SettingsScreen: {screen: SettingsScreen},
	NativeAudio: {screen: NativeAudio},
	FocusedImage: {screen: FocusedImage},
});

const AppRouter = createAppContainer(AppStack);

export default class App extends React.Component {

	// Firebase integration
	componentDidMount = () => {
		var config = {
			apiKey: "AIzaSyA23wbAZnIDclHiMqF045vKWXXa1LdU-G0",
			authDomain: "huey-f5674.firebaseapp.com",
			databaseURL: "https://huey-f5674.firebaseio.com",
			projectId: "huey-f5674",
			storageBucket: "huey-f5674.appspot.com",
			messagingSenderId: "219928889088"
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
