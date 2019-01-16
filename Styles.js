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

	containerLight: {
		flex: 1,
		backgroundColor: '#F6F6F6',
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

	blackButtonText: {
		color: '#000',
		fontWeight: '500',
		textAlign: 'center',

	},

	whiteButtonText: {
		color: '#fff',
		fontWeight: '500',
		textAlign: 'center',
	},

	darkButtonText: {
		color: '#383838',
		fontWeight: '500',
		textAlign: 'center',
	},

	textButton: {
		color: '#fff',
		marginTop: deviceHeight * 0.01,
	},

	cameraContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: deviceHeight,
		width: deviceWidth,

	},


	// 2. Login
	loginLogo: {
		width: deviceWidth * 0.7,
		height: deviceWidth * 0.7,
		marginBottom: deviceHeight * 0.15,
		marginTop: deviceHeight * 0.05
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
		backgroundColor: '#27AE60',
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

	loginText: {
		color: '#383838',
		fontSize: 14,
		width: deviceWidth * 0.8,
		textAlign: 'center',
		marginBottom: deviceHeight * 0.015,
	},

	forgotPassword: {
		color: '#383838',
		marginBottom: deviceHeight * 0.02,
		textAlign: 'right',
		marginLeft: deviceWidth * 0.5,
	},



	// 3. Forgot Password

	resetButton: {
		width: deviceWidth * 0.38,
		height: deviceHeight * 0.06,
		backgroundColor: '#e74c3c',
		marginTop: deviceHeight * 0.01,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: deviceWidth * 0.02,
		marginRight: deviceWidth * 0.02,
		borderRadius: 5,
	},

	cancelText: {
		color: '#383838',
		marginBottom: deviceHeight * 0.02,
		marginTop: deviceHeight * 0.02,
		textAlign: 'center',
	}

})