import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {fromLeft, fromRight, fromBottom, fromTop} from 'react-navigation-transitions'
import * as firebase from "firebase";

import styles from "./Styles";
import LoginScreen from './components/LoginScreen';
import ForgotPassword from './components/ForgotPassword';
import HomeScreen from './components/HomeScreen';
import MediaGallery from './components/MediaGallery';
import SettingsScreen from './components/SettingsScreen';
import NativeAudio from './components/NativeAudio';
import FocusedImage from './components/FocusedImage';
import ConsentScreen from './components/ConsentScreen';


const AppStack = createStackNavigator({
	LoginScreen: {screen: LoginScreen},
	ForgotPassword: {screen: ForgotPassword},
	HomeScreen: {screen: HomeScreen},
	MediaGallery: {screen: MediaGallery},
	SettingsScreen: {screen: SettingsScreen},
	NativeAudio: {screen: NativeAudio},
	FocusedImage: {screen: FocusedImage},
	ConsentScreen: {screen: ConsentScreen}, },
	{transitionConfig: (nav) => handleCustomTransition(nav)}
);

const handleCustomTransition = ({ scenes }) => {
	const prevScene = scenes[scenes.length - 2];
	const nextScene = scenes[scenes.length - 1];

	// Custom transitions go there
	if (prevScene && prevScene.route.routeName === 'HomeScreen' && nextScene.route.routeName === 'SettingsScreen') {
		return fromTop();
	} else if (prevScene && prevScene.route.routeName === 'SettingsScreen' && nextScene.route.routeName === 'HomeScreen'){
		return fromBotto
		();
	} else if (prevScene && prevScene.route.routeName === 'HomeScreen' && nextScene.route.routeName === 'MediaGallery'){
		return fromRight();
	} else if (prevScene && prevScene.route.routeName === 'MediaGallery' && nextScene.route.routeName === 'HomeScreen'){
		return fromLeft();
	} else if (prevScene && prevScene.route.routeName === 'HomeScreen' && nextScene.route.routeName === 'NativeAudio'){
		return fromBottom();
	} else if (prevScene && prevScene.route.routeName === 'NativeAudio' && nextScene.route.routeName === 'HomeScreen'){
		return fromTop();
	}
}

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
