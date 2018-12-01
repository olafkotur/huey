import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import styles from "./Styles";
import LoginScreen from './screens/LoginScreen';
import ForgotPassword from './screens/ForgotPassword';

const AppStack = createStackNavigator({
	LoginScreen: {screen: LoginScreen},
	ForgotPassword: {screen: ForgotPassword},
});

const AppRouter = createAppContainer(AppStack);

export default class App extends React.Component {


	// Return screen
	render() {
		return (
			<AppRouter />
		);
	}
}