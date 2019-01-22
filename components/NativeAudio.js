import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import styles from "../Styles";

export default class NativeAudio extends React.Component {

	state = {

	}


	render() {
    render (
      <View style = {styles.container}>

        <TouchableOpacity
          style = {styles.topLeftButton}
          onPress = {() => this.props.navigation.navigate('HomeScreen')} >
          <Icon name="arrow-back" style = {{color: '#000'}}  size = {30} />
        </TouchableOpacity>

      </View>
    );
  }
}
