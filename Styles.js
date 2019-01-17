import React, { StyleSheet, Platform, Dimensions } from 'react-native';

// Device dimension declaration
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({

	// Dev
	devButtonSmall: {
		width: 30,
		height: 30,
		backgroundColor: '#fff',
		borderRadius: 15,
	},

	cameraContainer: {
		flex: 1,
		backgroundColor: '#000',
		justifyContent: 'flex-end',
		alignSelf: 'stretch',
		height: deviceHeight,
		width: deviceWidth,
	},

	headingContainer: {
		bottom: deviceHeight * 0.44,
		left: deviceWidth * 0.42,
	},

	captureButton: {
		width: deviceWidth * 0.16,
		height: deviceWidth * 0.16,
		opacity: 0.9,
		borderRadius: deviceWidth * 0.08,
		borderWidth: 3,
		borderColor: '#fff',
		zIndex: 100,
		position: 'absolute',
		alignSelf: 'center',
		top: deviceHeight - (deviceHeight * 0.12),
	},

	/* 
	*
	*
		The code above is made purely to get back end functionality to 
		work please do move, modify, delete anything that is not needed 
		for front end. Note that a lot of this is brute forced to speed
		up backend so it will have to be changed.
	*
	*
	*/



	/*---------------------- Temp styles for solving camera scaling issues ------------------*/

	testCameraContainer: {
		flex: 1,
		backgroundColor: '#000',
		justifyContent: 'flex-end',
		alignSelf: 'stretch',
		marginBottom: -30,
	},

	nativeCameraParentContainer: {
		flex: 1,
		backgroundColor: '#F6F6F6',
		justifyContent: 'flex-end',
		alignItems: 'stretch',
		height: deviceHeight,
		width: deviceWidth,
	},

	testHeadingContainer: {
		bottom: deviceHeight * 0.44,
		left: deviceWidth * 0.42,
		justifyContent: 'center', 
		alignItems: '',
		},

	homeCameraParentContainer: {
		flex: 1,
		backgroundColor: '#000',
		justifyContent: 'center',
		alignItems: 'stretch',
		height: deviceHeight,
		width: deviceWidth,
	},

	testDevButtonSmall: {
		width: deviceWidth * 0.07,
		height: deviceWidth * 0.07,
		backgroundColor: '#fff',
		borderRadius: 9999,
	},

	testCaptureButton: {
		width: deviceWidth * 0.18,
		height: deviceWidth * 0.18,
		opacity: 0.9,
		borderRadius: 9999,
		borderWidth: 5,
		borderColor: '#fff',
		zIndex: 100,
		position: 'absolute',
		alignSelf: 'center',
		top: deviceHeight - 60,
	},




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