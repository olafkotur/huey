import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import styles from "../Styles";
import FileHandler from './FileHandler';
import GalleryImage from './GalleryImage';
import ImageList from './ImageList';
import AudioList from './AudioList';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



export default class MediaGallery extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: true,
	}

	state = {
		index: 0,
   		routes: [
      		{ key: 'first', title: 'Media' },
      		{ key: 'second', title: 'Audio' },
    	],
    	gestureName: 'none',
	}

	//Swipe Gesture Control
	onSwipeUp(gestureState) {
	}
	onSwipeDown(gestureState) {
	}
	onSwipeLeft(gestureState) {
	}
	onSwipeRight(gestureState) {
		this.props.navigation.navigate('HomeScreen');
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

	render() {

		return (

			<GestureRecognizer
				onSwipe={(direction, state) => this.onSwipe(direction, state)}
				onSwipeUp={(state) => this.onSwipeUp(state)}
				onSwipeDown={(state) => this.onSwipeDown(state)}
				onSwipeLeft={(state) => this.onSwipeLeft(state)}
				onSwipeRight={(state) => this.onSwipeRight(state)}
				config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
				style = {{flex:1, backgroundColor: "#27ae60"}} >

				<SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
						
					<View style = {styles.navbarGalleryContainer}>

						<View style = {styles.navbarBackContainer}>
							<TouchableOpacity
								style = {styles.navbarButton}
								onPress = {() => this.props.navigation.navigate('HomeScreen')} >
								<Icon name="chevron-left" style = {styles.navbarBackIcon}  size = {30} />
							</TouchableOpacity>
						</View>

						<View style = {styles.navbarRightContainer}>

							<Menu
								ref = {this.setMenuRef}
								button = {<Icon name="more-vert" style = {styles.navbarMenu} onPress={this.showMenu} size = {30} />} >

								<MenuItem onPress={this.hideMenu}>Filter</MenuItem>
								<MenuItem onPress={() => { this.fetchData(); this.hideMenu();}}>Refresh</MenuItem>
								<MenuItem onPress={this.hideMenu} disabled>Share</MenuItem>
								<MenuDivider />
								<MenuItem onPress={this.hideMenu}>Help</MenuItem>
							</Menu>

							<TouchableOpacity
								style = {styles.navbarButton}>
								<Icon name="info" style = {styles.navbarIcon}  size = {30} />
							</TouchableOpacity>

							<TouchableOpacity
								style = {styles.navbarButton}>
								<Icon name="sort" style = {styles.navbarIcon}  size = {30} />
							</TouchableOpacity>
						</View>

					</View>

					<TabView
				        renderScene = {SceneMap({first: ImageList, second: AudioList})}
				        navigationState = {this.state}
				        onIndexChange = {index => this.setState({ index })}
				        initialLayout = {{ width: 100, height:500}}
				        tabBarPosition = {'bottom'}
						style = {{backgroundColor: '#fff'}}
						renderTabBar = {props =>
							<TabBar
								{...props}
							    tabStyle={{ backgroundColor: '#27ae60', color: '#fff', marginBottom: 4}}
							    style={{backgroundColor: '#27ae60'}}
							    pressColor = {'transparent'}
							    renderIndicator={this._renderIndicator}
							    indicatorStyle={{backgroundColor: '#fff', height: 4}} >
						   </TabBar>
						} >

			     	</TabView>

				</SafeAreaView>

			</GestureRecognizer>
		);
	}
}
