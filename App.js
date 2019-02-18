import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { fromLeft, fromRight, fromBottom, fromTop } from 'react-navigation-transitions'
import * as firebase from "firebase";

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

	// Custom transitions
	if (prevScene && prevScene.route.routeName === 'HomeScreen' && nextScene.route.routeName === 'SettingsScreen') {
		return fromTop(500);
	} else if (prevScene && prevScene.route.routeName === 'SettingsScreen' && nextScene.route.routeName === 'HomeScreen'){
		return fromBottom(500);
	} else if (prevScene && prevScene.route.routeName === 'HomeScreen' && nextScene.route.routeName === 'MediaGallery'){
		return fromRight(500);
	} else if (prevScene && prevScene.route.routeName === 'MediaGallery' && nextScene.route.routeName === 'HomeScreen'){
		return fromLeft(500);
	} else if (prevScene && prevScene.route.routeName === 'HomeScreen' && nextScene.route.routeName === 'NativeAudio'){
		return fromLeft(500);
	} else if (prevScene && prevScene.route.routeName === 'NativeAudio' && nextScene.route.routeName === 'HomeScreen'){
		return fromRight(500);
	} else if (prevScene && (prevScene.route.routeName === 'LoginScreen' || prevScene.route.routeName === 'ConsentScreen') && nextScene.route.routeName === 'HomeScreen'){
		return fromRight(500);
	} else if (prevScene && prevScene.route.routeName === 'LoginScreen' && nextScene.route.routeName === 'ConsentScreen'){
		return fromRight(500);
	} else if (prevScene && prevScene.route.routeName === 'ConsentScreen' && nextScene.route.routeName === 'LoginScreen'){
		return fromLeft(500);
	} else {
		return fromTop(500);
	}
}

const AppRouter = createAppContainer(AppStack);

export default class App extends React.Component {

	// Firebase integration
	componentDidMount = () => {
		console.ignoredYellowBox = ['Setting a timer', 'Possible Unhandled Promise'];
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
