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
    onSwipeUp(gestureState) {
    }
    onSwipeDown(gestureState) {
        this.props.navigation.navigate('HomeScreen');
    }
    onSwipeLeft(gestureState) {
    }
    onSwipeRight(gestureState) {
    }
    onSwipe(gestureName, gestureState) {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
          case SWIPE_UP:
            break;
          case SWIPE_DOWN:
            break;
          case SWIPE_LEFT:
            break;
          case SWIPE_RIGHT:
            break;
        }
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
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (

            <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                onSwipeUp={(state) => this.onSwipeUp(state)}
                onSwipeDown={(state) => this.onSwipeDown(state)}
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}
                style = {{flex:1, backgroundColor: "#27ae60"}}
            >
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
            </GestureRecognizer>
        );
    }
}
