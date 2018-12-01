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

	doubleButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},

	textContainerRight: {
		alignSelf: 'flex-end',
		marginRight: deviceWidth * 0.1,
	},



	// 2. Login
	loginLogo: {
		width: deviceWidth * 0.35,
		height: deviceWidth * 0.35,
		marginBottom: deviceHeight * 0.15,
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
	},

	loginButton: {
		width: deviceWidth * 0.38,
		height: deviceHeight * 0.06,
		backgroundColor: '#50e3c1',
		marginTop: deviceHeight * 0.04,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: deviceWidth * 0.02,
		marginRight: deviceWidth * 0.02,
		borderRadius: 5,
	},

	signupButton: {
		width: deviceWidth * 0.38,
		height: deviceHeight * 0.06,
		backgroundColor: '#fff',
		marginTop: deviceHeight * 0.04,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: deviceWidth * 0.02,
		marginRight: deviceWidth * 0.02,
		borderRadius: 5,
	},

	signupButtonText: {
		color: '#000',
		fontWeight: '500',
		textAlign: 'center',
	},

	loginButtonText: {
		color: '#fff',
		fontWeight: '500',
		textAlign: 'center',
	},



	// 3. Forgot Password
	forgotPassword: {
		color: '#fff',
		marginBottom: deviceHeight * 0.02,
	},

	resetButton: {
		width: deviceWidth * 0.38,
		height: deviceHeight * 0.06,
		backgroundColor: '#e74c3c',
		marginTop: deviceHeight * 0.04,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: deviceWidth * 0.02,
		marginRight: deviceWidth * 0.02,
		borderRadius: 5,
	},

})