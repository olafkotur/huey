import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';

import styles from "../Styles";
import GalleryImage from './GalleryImage';
import FileHandler from './FileHandler';

export default class AudioList extends React.Component {

	state = {
		refreshing: false,
		audioData: []
	}

	componentDidMount = async () => {
		this.fetchData();
	}

	// Fetches audio data from firebase
	fetchData = async () => {
		this.setState({refreshing: true});
		Handler = new FileHandler();
		await Handler.getMedia('audio').then((data) => this.setState({audioData: data}));
		this.setState({refreshing: false});
	}

	// Plays back selected audio
	handlePlayback = () => {
		console.log('Attempting to playback');
	}

	// Renders each audio file
	renderItem = (item) => {
		const fileName = item.url.split('audio%2F').pop().split('?')[0].split('.')[0];
		var options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};
		let date = new Date(parseInt(fileName));
		date = new Intl.DateTimeFormat('en-GB', options).format(date);
		return (
			<TouchableOpacity
				style = {styles.audioItemContainer}
				onPress = {() => this.handlePlayback(item.url)}>
				<Text>{date}</Text>
			</TouchableOpacity>
		);
	}


	render() {
		return (
			<View style = {styles.galleryTabViewContainer}>	
				  <FlatList
					data = {this.state.audioData}
					extraData = {this.state}
					keyExtractor = {(item, index) => index.toString()}
					renderItem = {({item}) => this.renderItem(item)}
					refreshing = {this.state.refreshing}
					onRefresh = {() => this.fetchData()} >
				</FlatList>
			</View>
		);
	}
}