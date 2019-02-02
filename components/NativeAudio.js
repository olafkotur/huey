import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from "../Styles";

export default class NativeAudio extends React.Component {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    state = {
        microphonePermission: null
        isRecording: false,
        isHidden: false,
        audioRecordingButtonStyle: styles.audioRecordButton,
        buttonContainerStyle: styles.buttonContainer
    }

    // Toggle the recoridng button between active and inactive styles
    toggleRecording = async (action) => {
        //If the hit record event is called, flip the is recording state
        
        (action === 'recording') ? await this.setState({isRecording: !this.state.isRecording}) : await this.setState({isHidden: !this.state.isHidden});
        const status = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        this.setState({microphonePermission: status === 'granted'});

        console.log(await Permissions.askAsync(Permissions.AUDIO_RECORDING))
        console.log(this.state.microphonePermission)

        // Record button styling
        if (this.state.isRecording) {
            this.setState({audioRecordingButtonStyle: styles.audioRecordingButton});
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
                        onPress = {async () => this.toggleRecording('recording')}>
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
