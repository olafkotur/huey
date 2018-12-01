import React, { StyleSheet, Platform, Dimensions } from 'react-native';

// Device dimension declaration
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({

	// 1. Global
	container: {
		flex: 1,
		backgroundColor: '#273c75',
		alignItems: 'center',
		justifyContent: 'center',
	},


	// 2. Login
	loginLogo: {
		width: deviceWidth * 0.35,
		height: deviceWidth * 0.35,
	},

	loginTextField: {
		width: deviceWidth * 0.8,
		height: deviceHeight * 0.06,
		marginBottom: deviceHeight * 0.015,
		borderRadius: 5,
		backgroundColor: 'rgba(255, 255, 255, 1)',
		color: '#000',
		fontWeight: '200',
		textAlign: 'center',
	}

})