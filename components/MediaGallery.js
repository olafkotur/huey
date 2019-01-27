import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from "../Styles";
import FileHandler from './FileHandler';
import GalleryImage from './GalleryImage';

export default class MediaGallery extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: true,
	}

	state = {
		mediaData: [],
		singleImageUri: ''
	}

	componentDidMount = () => {
		this.fetchData();
	}


	// Fetches image gallery data
	fetchData = async () => {
		Handler = new FileHandler();
		await Handler.getMedia().then((data) => this.setState({mediaData: data}));
	}

	renderImage = (item) => {
		return (
			<TouchableOpacity 
				onPress = {() => this.props.navigation.navigate('FocusedImage', {uri: item.url})} >
				<GalleryImage uri = {item.url} />
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
				<View style = {styles.container}>

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

					<View style = {styles.galleryContainer}>
						<FlatList
							data = {this.state.mediaData}
							extraData = {this.state}
							horiztonal = {false}
							numColumns = {3}
							keyExtractor = {(item, index) => index.toString()}
	      					renderItem = {({item}) => this.renderImage(item)}>
						</FlatList>
					</View>

					<View style = {styles.bottomBar}>
					</View>

				</View>
			</SafeAreaView>
		);
	}
}
