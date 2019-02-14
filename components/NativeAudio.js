import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Permissions, Audio } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from "../Styles";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Recorder, Player} from 'react-native-audio-player-recorder-no-linking';

export default class NativeAudio extends React.Component {

    constructor(props) {
        super(props);
        this.recording = null;
        this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
    }

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    state = {
        isRecording: false,
        isHidden: false,
        audioRecordingButtonStyle: styles.audioRecordButton,
        buttonContainerStyle: styles.buttonContainer,
        gestureName: 'none',
        audioURI: ''
    }

    componentDidMount = async () => {
        await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    }

    //Swipe Gesture Control
    onSwipeDown(gestureState) {
        this.props.navigation.navigate('HomeScreen');
    }

    // Toggle the recoridng button between active and inactive styles
    toggleRecording = async (action) => {
        (action === 'recording') ? await this.setState({isRecording: !this.state.isRecording}) : await this.setState({isHidden: !this.state.isHidden});

        // Record button styling
        if (this.state.isRecording) {
            this.setState({audioRecordingButtonStyle: styles.audioRecordingButton});
            this.stopRecording();
        }
        else {
            this.setState({audioRecordingButtonStyle: styles.audioRecordButton});
        }

        // Hide button styling
        if (this.state.isHidden) {
            this.setState({buttonContainerStyle: styles.hide});
        }
        else {
            this.setState({buttonContainerStyle: styles.buttonContainer});
        }
    }


    handleRecording = async () => {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true
        });

        // Prepare the recording
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(this.recordingSettings);
        this.recording = recording;

        // Start recording
        await this.recording.startAsync();
        console.log('Started to record');
    }

    stopRecording = async () => {
        try {
            await this.recording.stopAndUnloadAsync();
            const uri = this.recording.getURI();
            this.setState({audioURI: this.recording.getURI()})
        } catch (error) {  
            console.log("Nothing to stop");
        }
    }

    render() {

        return (

            <GestureRecognizer
                onSwipeDown={(state) => this.onSwipeDown(state)}
                config = {{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
                style = {{flex:1, backgroundColor: "#27ae60"}}>

                <View style = {styles.container}>

                    <TouchableOpacity
                        style = {styles.topLeftButton}
                        onPress = {() => this.props.navigation.navigate('HomeScreen')} >
                        <Icon name="chevron-left" style = {styles.topLeftButtonIcon} />
                    </TouchableOpacity>

                    <View style = {this.state.buttonContainerStyle}>
                        <TouchableOpacity
                            style = {this.state.audioRecordingButtonStyle}
                            // onPress = {async () => this.toggleRecording('recording')}>
                            onPress = {() => this.handleRecording()}>
                            <Icon name="mic" style = {styles.audioRecordButtonMic} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style = {styles.hideButton}
                        // onPress = {async () => this.toggleRecording('hidden')}>
                        onPress = {async () => this.stopRecording()}>
                        <Icon name="remove-red-eye" style = {styles.hideButton} />
                    </TouchableOpacity>

                </View>

            </GestureRecognizer>
        );
    }
}
