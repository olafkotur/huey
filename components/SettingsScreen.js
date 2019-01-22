import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from "../Styles";

export default class SettingsScreen extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {

	}

	render() {
		return (
			<View style = {styles.container}>

				<TouchableOpacity
					style = {styles.topLeftButton}
					onPress = {() => this.props.navigation.navigate('HomeScreen')} >
					<Icon name="arrow-back" style = {{color: "#000"}}  size = {30} />
				</TouchableOpacity>

				<View style = {styles.settingsMenuContainer}>
					<TouchableOpacity
						style = {styles.settingsMenuButton}
						onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
						<Icon name="movie-creation" style = {styles.settingsRecordingIcon}  size = {30} />
					</TouchableOpacity>
					<TouchableOpacity
						style = {styles.settingsMenuButton}
						onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
						<Icon name="photo-size-select-actual" style = {styles.settingsLibraryIcon}  size = {30} />
					</TouchableOpacity>
					<TouchableOpacity
						style = {styles.settingsMenuButton}
						onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
						<Icon name="brush" style = {styles.settingsAppearanceIcon}  size = {30} />
					</TouchableOpacity>
					<TouchableOpacity
						style = {styles.settingsMenuButton}
						onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
						<Icon name="lock" style = {styles.settingsSecurityIcon}  size = {30} />
					</TouchableOpacity>
					<TouchableOpacity
						style = {styles.settingsMenuButton}
						onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
						<Icon name="info" style = {styles.settingsAboutIcon}  size = {30} />
					</TouchableOpacity>

				</View>

			</View>
		);
	}
}
