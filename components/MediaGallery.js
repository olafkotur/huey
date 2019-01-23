import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from "../Styles";
import FileHandler from './FileHandler';
import GalleryImage from './GalleryImage';

export default class MediaGallery extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: false,
	}

	state = {
		mediaData: []
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
			<GalleryImage 
				uri = {item.url} >
			</GalleryImage>
		);
	}

	render() {
		return (
			<View style = {styles.container}>
				<View style = {styles.navbarContainer}> 
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

			</View>
		);
	}
}