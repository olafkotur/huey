import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Audio } from 'expo';
import styles from "../Styles";
import FileHandler from './FileHandler';

export default class AudioList extends React.Component {

	constructor(props) {
		super(props);
		this.sound = null;
	}

	state = {
		refreshing: false,
		isPlaying: false,
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
	handlePlayback = async (url) => {
		if (this.state.isPlaying) {
			console.log('Stopping playback');
			this.setState({isPlaying: false});
			// this.sound.stopAsync();
		}
		else {
			console.log('Attempting to playback');
			this.setState({isPlaying: true});

			// const sound = new Audio.Sound();
			// try {
			// 	await sound.loadAsync({uri: url});
			// 	this.sound = sound;
			// 	await sound.playAsync();
			// 	console.log('Sound is playing')
			// } catch (error) {
			// 	console.log(error.message);
			// }
		}
	}

	// Renders each audio file
	renderItem = (item) => {
		// Format date DD:MM:YYYY, hh:mm,ss
		const fileName = item.url.split('audio%2F').pop().split('?')[0].split('.')[0];
		var options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};
		let date = new Date(parseInt(fileName));
		//date = new Intl.DateTimeFormat('en-GB', options).format(date);

		return (
			<View
				style = {styles.audioItemContainer}>
				<Text>{date.toString()}</Text>

				<TouchableOpacity 
					onPress = {() => this.handlePlayback(item.url)}>
					<Text>Play/Pause</Text>
				</TouchableOpacity>

			</View>
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