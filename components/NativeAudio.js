import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from "../Styles";

export default class NativeAudio extends React.Component {

  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  }

	state = {

	}


	render() {
    return (
      <View style = {styles.container}>

        <TouchableOpacity
          style = {styles.topLeftButton}
          onPress = {() => this.props.navigation.navigate('HomeScreen')} >
          <Icon name="arrow-back" style = {styles.topLeftButtonIcon} />
        </TouchableOpacity>

        <View style = {styles.buttonContainer}>
          <TouchableOpacity
            style = {styles.audioRecordButton}
            onPress = {() => console.log("Audio Record Pressed")} >
              <Icon name="mic" style = {styles.audioRecordButtonMic} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style = {styles.hideButton}
          onPress = {() => console.log("Hide Button Pressed")} >
          <Icon name="remove-red-eye" style = {styles.hideButton} />
        </TouchableOpacity>


      </View>
    );
  }
}
