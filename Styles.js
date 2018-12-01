import React, { StyleSheet, Platform, Dimensions } from 'react-native';

// Device dimension declaration
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({

	// 1. Global
	container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

})