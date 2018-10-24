import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import styles from "./Styles";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Greetings</Text>
      </View>
    );
  }
}
