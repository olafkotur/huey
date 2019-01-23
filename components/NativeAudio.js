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
          <Icon name="arrow-back" style = {{color: "#000"}}  size = {30} />
        </TouchableOpacity>

        <TouchableOpacity
          style = {styles.audioRecordButton}
          onPress = {() =>
            this.captureMedia('photo'),
            console.log("Audio Record Pressed")} >
        </TouchableOpacity>

      </View>
    );
  }
}
