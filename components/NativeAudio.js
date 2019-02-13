import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from "../Styles";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class NativeAudio extends React.Component {

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
    }

    //Swipe Gesture Control
    onSwipeLeft(gestureState) {
        this.props.navigation.navigate('HomeScreen');
    }

    // Toggle the recoridng button between active and inactive styles
    toggleRecording = async (action) => {
        (action === 'recording') ? await this.setState({isRecording: !this.state.isRecording}) : await this.setState({isHidden: !this.state.isHidden});

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

            <GestureRecognizer
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                config = {{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
                style = {{flex:1, backgroundColor: "#27ae60"}}
            >
            <View style = {styles.container}>

                <TouchableOpacity
                    style = {styles.topLeftButton}
                    onPress = {() => this.props.navigation.navigate('HomeScreen')} >
                    <Icon name="chevron-left" style = {styles.topLeftButtonIcon} />
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
            </GestureRecognizer>
        );
    }
}
