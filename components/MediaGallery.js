import React from 'react';
import { View, TouchableOpacity, SafeAreaView, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import styles from "../Styles";
import ImageList from './ImageList';
import AudioList from './AudioList';
import FileHandler from './FileHandler';


export default class MediaGallery extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: true,
	}

	state = {
		mediaData: [],
		audioData: [],
		loading: true,
		index: 0,
   		routes: [
      		{ key: 'first', title: 'Media' },
      		{ key: 'second', title: 'Audio' },
    	]
	}

	componentWillMount = async () => {
		await this.fetchData();
	}

	fetchData = async () => {
		this.setState({loading: true})
		Handler = new FileHandler();
		await Handler.getMedia('media').then(async(data) => await this.setState({mediaData: data}));
		await Handler.getMedia('audio').then(async (data) => await this.setState({audioData: data, loading: false}));
	}

	getImageList = () => {
		return <ImageList data = {this.state.mediaData}/>
	}

	getAudioList = () => {
		return <AudioList data = {this.state.audioData}/>
	}

	_menu = null;
	 
	setMenuRef = ref => {
		this._menu = ref;
	};

	render() {
		if (!this.state.loading) {
			return (
				<View style = {{flex:1, backgroundColor: "#27ae60"}} >

					<SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
							
						<View style = {styles.navbarGalleryContainer}>

							<View style = {styles.navbarBackContainer}>
								<TouchableOpacity
									onPress = {() => this.props.navigation.navigate('HomeScreen')} >
									<Icon name="chevron-left" style = {styles.navbarBackIcon} size = {30} />
								</TouchableOpacity>
							</View>

							<View style = {styles.navbarRightContainer}>

								<Menu
									ref = {this.setMenuRef}
									button = {<Icon name="more-vert" style={styles.navbarButton} onPress={() => this._menu.show()} size = {30} />} >

									<MenuItem onPress={() => this._menu.hide()}>Filter</MenuItem>
									<MenuItem onPress={() => this._menu.hide()} disabled>Share</MenuItem>
									<MenuDivider />
									<MenuItem onPress={() => this._menu.hide()}>Help</MenuItem>
								</Menu>

								<TouchableOpacity
									style = {styles.navbarButton}
									onPress = {() => this.fetchData()}>
									<Icon name="refresh" style = {styles.navbarIcon}  size = {30} />
								</TouchableOpacity>

							</View>

						</View>

						<TabView
							renderScene = {SceneMap({first: this.getImageList, second: this.getAudioList})}
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

				</View>
			);
		}
		else {
			return (
				<View style = {styles.container}>
					<Image 
						source = {require('../static/loader.gif')} 
						style = {styles.loader}>
					</Image>
				</View>
			);
		}
	}
}
