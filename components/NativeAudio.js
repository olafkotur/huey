import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Audio, Permissions, FileSystem, Platform } from 'expo';
import styles from "../Styles";

export default class NativeAudio extends React.Component {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    state = {
        microphonePermission: null,
        isRecording: false,
        isHidden: false,
        audioRecordingButtonStyle: styles.audioRecordButton,
        buttonContainerStyle: styles.buttonContainer
    }

    componentWillMount = async () => {
      const {status} = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      this.setState({microphonePermission: status === 'granted'});
    }

    captureMedia = async () => {
      if (!this.state.isRecording) {
        const recording = new Audio.Recording();
        try {
          await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          await recording.startAsync();
          this.setState({isRecording: true});
          console.log('starting recording');

          recording.stopAsync();
          this.setState({isRecording: false});
        } catch (e) {
          console.log(e);
        }
      }
      else {

      }
    }

    // Toggle the recoridng button between active and inactive styles
    toggleRecording = async (action) => {
    //     action === 'recording' ? await this.setState({isRecording: !this.state.isRecording}) : await this.setState({isHidden: !this.state.isHidden});
    //     this.state.isHidden ? this.setState({buttonContainerStyle: styles.hide}) : this.setState({buttonContainerStyle: styles.buttonContainer});
    }

    saveInCloud = (uri, action) => {
      const extension = (Platform.OS === 'android') ? '.m4a' : '.caf';
      const name = Date.now().toString() + extension;
      Handler = new FileHandler();
      Handler.uploadMedia(uri, name);
    }

    render() {
        return (
            <View style = {styles.container}>

                <TouchableOpacity
                    style = {styles.topLeftButton}
                    onPress = {() => this.props.navigation.navigate('HomeScreen')} >
                    <Icon name="arrow-back" style = {styles.topLeftButtonIcon} />
                </TouchableOpacity>

                <View style = {this.state.buttonContainerStyle}>
                    <TouchableOpacity
                        style = {this.state.audioRecordingButtonStyle}
                        onPress = {async () => {
                          this.toggleRecording();
                          this.captureMedia();
                        }}>
                        <Icon name="mic" style = {styles.audioRecordButtonMic} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style = {styles.hideButton}
                    onPress = {async () => this.toggleRecording('hidden')}>
                    <Icon name="remove-red-eye" style = {styles.hideButton} />
                </TouchableOpacity>

            </View>
        );
    }
}
