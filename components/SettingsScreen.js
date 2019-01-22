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

					{/* Search Bar */}
					<Text style = {{alignSelf: "center"}}>SEARCH BAR HERE </Text>

					{/* Recording Settings */}
					<TouchableOpacity
						style = {styles.settingsMenuButton}
						onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
						<Icon name="movie-creation" style = {styles.settingsRecordingIcon}  size = {30} />
						<Text style = {styles.settingsMenuTitleText}>Recording</Text>
						<Text style = {styles.settingsMenuSubtitleText}>Quality, Default Format, Audio Recording...</Text>
						<Icon name="chevron-right" style = {styles.settingsRightArrow}  size = {30} />
					</TouchableOpacity>

					{/* Library Settings */}
					<TouchableOpacity
						style = {styles.settingsMenuButton}
						onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
						<Icon name="photo-size-select-actual" style = {styles.settingsLibraryIcon}  size = {30} />
												<Text style = {styles.settingsMenuTitleText}>Library</Text>
						<Text style = {styles.settingsMenuSubtitleText}>Storage Settings, Tags, Album Settings...</Text>
						<Icon name="chevron-right" style = {styles.settingsRightArrow}  size = {30} />
					</TouchableOpacity>

					{/* Appearance Settings */}
					<TouchableOpacity
						style = {styles.settingsMenuButton}
						onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
						<Icon name="brush" style = {styles.settingsAppearanceIcon}  size = {30} />
						<Text style = {styles.settingsMenuTitleText}>Appearance</Text>
						<Text style = {styles.settingsMenuSubtitleText}>Theme, Custom Colours, Accessibility...</Text>
						<Icon name="chevron-right" style = {styles.settingsRightArrow}  size = {30} />
					</TouchableOpacity>

					{/* Security Settings */}
					<TouchableOpacity
						style = {styles.settingsMenuButton}
						onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
						<Icon name="lock" style = {styles.settingsSecurityIcon}  size = {30} />
						<Text style = {styles.settingsMenuTitleText}>Security</Text>
						<Text style = {styles.settingsMenuSubtitleText}>Passcode, Encryption...</Text>
						<Icon name="chevron-right" style = {styles.settingsRightArrow}  size = {30} />
					</TouchableOpacity>

					{/* About */}
					<TouchableOpacity
						style = {styles.settingsMenuButton}
						onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
						<Icon name="info" style = {styles.settingsAboutIcon}  size = {30} />
						<Text style = {styles.settingsMenuTitleText}>About</Text>
						<Text style = {styles.settingsMenuSubtitleText}>Application Info, Terms & Conditions...</Text>
						<Icon name="chevron-right" style = {styles.settingsRightArrow}  size = {30} />
					</TouchableOpacity>

				</View>

			</View>
		);
	}
}
