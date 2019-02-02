import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import styles from "../Styles";
import FileHandler from './FileHandler';
import GalleryImage from './GalleryImage';


const FirstRoute = () => (
	<View style = {styles.container}>

		<View style = {styles.galleryContainer}>

		</View>
	</View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#fff' }]} />
);

export default class MediaGallery extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: true,
	}

	state = {
		mediaData: [],
		singleImageUri: '',
		refreshing: false,
		index: 0,
   		routes: [
      		{ key: 'first', title: 'Media' },
      		{ key: 'second', title: 'Audio' },
    	],
	}

	componentDidMount = () => {
		this.fetchData();
	}


	// Fetches image gallery data
	fetchData = async () => {
		this.setState({refreshing: true});
		Handler = new FileHandler();
		await Handler.getMedia().then((data) => this.setState({mediaData: data}));
		this.setState({refreshing: false});
	}

	renderImage = (item) => {
		let fileType = '';
		const fileName = item.url.split('media%2F').pop().split('?')[0];
		(fileName.includes('.png')) ? (fileType = 'photo') : (fileType = 'video');

		return (
			<TouchableOpacity
				onPress = {() => this.props.navigation.navigate('FocusedImage', {uri: item.url, fileType: fileType})} >
				<GalleryImage uri = {item.url} fileType = {fileType} />
			</TouchableOpacity>
		);
	}

	render() {
		return (

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
						<TouchableOpacity
							style = {styles.navbarButton}>
							<Icon name="more-vert" style = {styles.navbarIcon}  size = {30} />
						</TouchableOpacity>

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

			        renderScene={SceneMap({
			        	first: () => (
			          		<View style = {styles.galleryTabViewContainer}>						
			          			<FlatList
									data = {this.state.mediaData}
									extraData = {this.state}
									horiztonal = {false}
									numColumns = {3}
									keyExtractor = {(item, index) => index.toString()}
			      					renderItem = {({item}) => this.renderImage(item)}
			      					refreshing = {this.state.refreshing}
			      					onRefresh = {() => this.fetchData()} >
								</FlatList>
							</View>
			          	),
			          	second: () => (
			          		<View style = {styles.galleryTabViewContainer}>						
			          			<Text>Memelist for audio files here</Text>
							</View>
			          	)
			        })}

			        navigationState={this.state}
			        onIndexChange={index => this.setState({ index })}
			        initialLayout={{ width: 100, height:500}}
			        tabBarPosition={'bottom'}
					style={{backgroundColor: '#fff'}}

					renderTabBar={props =>
						<TabBar
							{...props}

						    tabStyle={{ backgroundColor: '#27ae60', color: '#fff', marginBottom: 4}}
						    style={{backgroundColor: '#27ae60'}}
						    pressColor = {'transparent'}
						    renderIndicator={this._renderIndicator}
						    indicatorStyle={{backgroundColor: '#fff', height: 4}}
						/>
					}
		     	/>
			</SafeAreaView>
		);
	}
}
