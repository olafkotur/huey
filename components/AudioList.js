import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Audio } from 'expo';
import styles from "../Styles";
import FileHandler from './FileHandler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

export default class AudioList extends React.Component {

    constructor(props) {
        super(props);
        this.sound = null;
    }

    state = {
        refreshing: false,
        isPlaying: false,
        isPlayingURL: '',
        audioData: [],
        playIcon: 'play',
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
        // Stop audio if already playing
        if (this.state.isPlaying) {
            this.setState({isPlaying: false, isPlayingURL: ''});
            try {
                await this.sound.stopAsync();
                await this.sound.unloadAsync();
            } catch (error) {
                console.log(error.message);
            }
        }
        
        // Play audio if not already playing 
        else {
            const fileName = url.split('audio%2F').pop().split('?')[0];
            const uri = await Handler.getLocalFile(fileName, url);
            this.setState({isPlaying: true, isPlayingURL: url});

            const sound = new Audio.Sound();
            try {
                await sound.loadAsync({uri: uri});
                this.sound = sound;
                await sound.playAsync();
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    // Renders each audio file
    renderItem = (item) => {
        // Format date DD:MM:YYYY, hh:mm,ss
        const fileName = item.url.split('audio%2F').pop().split('?')[0].split('.')[0];
        const date = moment.unix(Math.ceil(fileName / 1000)).format('MMMM Do YYYY, h:mm:ss');

        return (
                <View 
                    style = {styles.audioItemContainer}>
                    <Text style = {styles.audioItemTitle}>{date}</Text>

                    <TouchableOpacity 
                        style={styles.audioPlayButton}
                        onPress = {() => this.handlePlayback(item.url)}>
                        <Icon name={(item.url === this.state.isPlayingURL) ? 'pause' : 'play'} style = {styles.audioPlayIcon} size = {40}/>
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
                    onRefresh = {() => this.fetchData()}>
                </FlatList>
            </View>
        );
    }
}