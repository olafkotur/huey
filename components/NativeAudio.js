import React from 'react';
import { View, TouchableOpacity, Text, TouchableHighlight } from 'react-native';
import { Permissions, Audio } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from "../Styles";
import GestureRecognizer from 'react-native-swipe-gestures';
import DropdownAlert from 'react-native-dropdownalert';
import FileHandler from './FileHandler';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import BlinkView from 'react-native-blink-view'



const options = {
    container: {        
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: 'red',
    },
    text: {
        fontSize: 30,
        color: '#4b4b4b',
    }
};

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
        micButtonStyle: styles.audioRecordButtonMic,
        gestureName: 'none',
        stopwatchReset: false,
        stopwatchStart: false,
        blinkStyle: styles.blinkingCircleOff,
        overlayViewStyle: styles.showScreen,
    }

    componentDidMount = async () => {
        await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    }

    //Swipe Gesture Control
    onSwipeLeft(gestureState) {
        this.props.navigation.navigate('HomeScreen');
    }

    // Hide and unhide the recording button
    handleHidden = () => {
        if (this.state.isHidden === true) {
            this.setState({overlayViewStyle: styles.showScreen, isHidden: false});
            console.log("MEME");
        }
        else {
            this.setState({overlayViewStyle: styles.hideScreen, isHidden: true});
            console.log("MEME");
        }
    }

    // Toggle the recoridng button between active and inactive styles
    handleRecording = async () => {

        // Start a new recording
        if (!this.state.isRecording) {
            this.setState({audioRecordingButtonStyle: styles.audioRecordingButton, micButtonStyle: styles.audioRecordingButtonMic, isRecording: true, stopwatchReset: false, stopwatchStart: true, blinkStyle: styles.blinkingCircleOn});
            await this.startRecording();
        }
        // End current recording
        else {
            this.setState({audioRecordingButtonStyle: styles.audioRecordButton, micButtonStyle: styles.audioRecordButtonMic, isRecording: false, stopwatchReset: true, stopwatchStart: false, blinkStyle: styles.blinkingCircleOff});
            await this.stopRecording();
        }
    }

    // Prepares the recorder and beginds to record audio
    startRecording = async () => {
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
    }

    // Attemps to stop the recording if one is in action
    stopRecording = async () => {
        try {
            await this.recording.stopAndUnloadAsync();
            const uri = this.recording.getURI();
            await this.saveInCloud(uri)
        } catch (error) {  
            this.dropdown.alertWithType('error', 'Error', 'Something went wrong');
        }
    }

    // Sends to firebase as backup
	saveInCloud = (uri) => {
		const extension = '.mp3';
		const name = Date.now().toString() + extension;
		Handler = new FileHandler();
		Handler.uploadMedia(uri, name);
	}

    render() {

        return (

            <GestureRecognizer
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
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
                            onPress = {() => this.handleRecording()}>
                            <Icon name="mic" style = {this.state.micButtonStyle} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style = {styles.hideButton}
                        onPress = {() => this.handleHidden()}>
                        <Icon name="remove-red-eye" style = {styles.hideButton} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={this.state.overlayViewStyle} 
                        onLongPress = {() => this.handleHidden()}
                        activeOpacity={0.9}>
                    </TouchableOpacity>



                    <View>
                         <View style={styles.recordingStopwatch}>
                            <Stopwatch  start={this.state.stopwatchStart}
                                        reset={this.state.stopwatchReset}
                                        options={options}
                            />
                            <BlinkView blinking={true} delay={1000} style = {this.state.blinkStyle}>
                            </BlinkView>
                        </View>
                    </View>

                </View>

                <DropdownAlert ref={ref => this.dropdown = ref} />

            </GestureRecognizer>
        );
    }
}