import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, TextInput, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import styles from "../Styles";


export default class SettingsScreen extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: true,
	}

	state = {
		gestureName: 'none',
	}

	_menu = null;
	 
	setMenuRef = ref => {
		this._menu = ref;
	};

	hideMenu = () => {
		this._menu.hide();
	};

	showMenu = () => {
		this._menu.show();
	};

	//Swipe Gesture Control
	onSwipeUp(gestureState) {
		this.props.navigation.navigate('HomeScreen');
	}
	onSwipeDown(gestureState) {
	}
	onSwipeLeft(gestureState) {
	}
	onSwipeRight(gestureState) {
	}
	onSwipe(gestureName, gestureState) {
		const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
		this.setState({gestureName: gestureName});
		switch (gestureName) {
		  case SWIPE_UP:
		    break;
		  case SWIPE_DOWN:
		    break;
		  case SWIPE_LEFT:
		    break;
		  case SWIPE_RIGHT:
		    break;
		}
	}

	render() {

		const config = {
	    	velocityThreshold: 0.3,
	      	directionalOffsetThreshold: 80
	    };

		return (

			<GestureRecognizer
				onSwipe={(direction, state) => this.onSwipe(direction, state)}
				onSwipeUp={(state) => this.onSwipeUp(state)}
				onSwipeDown={(state) => this.onSwipeDown(state)}
				onSwipeLeft={(state) => this.onSwipeLeft(state)}
				onSwipeRight={(state) => this.onSwipeRight(state)}
				config={config}
				style = {{flex:1, backgroundColor: "#27ae60"}}
			>

				<KeyboardAwareScrollView
					contentContainerStyle = {styles.container}
					keyboardDismissMode = 'on-drag'
					keyboardShouldPersistTaps = 'never'
					scrollEnabled = {false}
					enableAutomaticScroll = {false}
				>

					<View style = {styles.navbarContainer}> 
						<View style = {styles.navbarBackContainer}> 
							<TouchableOpacity
								style = {styles.navbarButton}
								onPress = {() => this.props.navigation.navigate('HomeScreen')} >
								<Icon name="chevron-left" style = {styles.navbarBackIcon}  size = {30} />
							</TouchableOpacity>
						</View>

						<View style = {styles.navbarRightContainer}>
							<Menu
									ref={this.setMenuRef}
									button={ 				
											<Icon name="more-vert" style = {styles.navbarMenu} onPress={this.showMenu} size = {30} />
										}
									>
									<MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
									<MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
									<MenuItem onPress={this.hideMenu} disabled>Menu item 3</MenuItem>
									<MenuDivider />
									<MenuItem onPress={this.hideMenu}>Help</MenuItem>
							</Menu>

						</View>
					</View>

					{/* Search Bar */}
					<TextInput
						style = {styles.settingsSearchField}
						secureTextEntry = {false}
						placeholder = 'Search Settings'
						placeholderTextColor = '#a9a9a9'
						underlineColorAndroid = 'rgba(0,0,0,0)'>
					</TextInput>

					<Icon name="search" style = {styles.settingsSearchIcon} size = {30} />

					<View style = {styles.settingsMenuContainer}>

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
							<Text style = {styles.settingsMenuSubtitleText}>Passcode, Encryption, Upload Security...</Text>
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

				</KeyboardAwareScrollView>

			</GestureRecognizer>
		);
	}
}
