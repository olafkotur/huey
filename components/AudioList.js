import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Audio } from 'expo';
import styles from "../Styles";
import FileHandler from './FileHandler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class AudioList extends React.Component {

    constructor(props) {
        super(props);
        this.sound = null;
    }

    state = {
        refreshing: false,
        isPlaying: false,
        audioData: [],
        playIcon: 'play'
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
            this.setState({isPlaying: false, playIcon: 'play'});
            await this.sound.stopAsync();
            await this.sound.unloadAsync();
        }
        
        // Play audio if not already playing 
        else {
            this.setState({isPlaying: true, playIcon: 'pause'});

            const sound = new Audio.Sound();
            try {
                await sound.loadAsync({uri: url});
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
        var options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'};
        let date = new Date(parseInt(fileName));
        date = new Intl.DateTimeFormat('en-GB', options).format(date);

        return (
                <View 
                    style = {styles.audioItemContainer}>
                    <Text style = {styles.audioItemTitle}>{date}</Text>

                    <Text>00:00:00/00:02:37</Text>

                    <TouchableOpacity 
                        style={styles.audioPlayButton}
                        onPress = {() => this.handlePlayback(item.url)}>
                        <Icon name={this.state.playIcon} style = {styles.audioPlayIcon} size = {40}/>
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