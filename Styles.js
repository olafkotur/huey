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

	devButtonSmall: {
		width: 30,
		height: 30,
		backgroundColor: '#fff',
		borderRadius: 15,
	},


	// folder button homepage
	folderButton: {
		width: 30,
		height: 30,
		opacity: 0.9,
		zIndex: 100,
		position: 'absolute',
		alignSelf: 'center',
		top: deviceHeight - ((deviceHeight * 0.05)+5),
		left:10,
	},

	folderIcon: {
		color: '#fff',
		fontSize:30,
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


	/*
		TABLE OF CONTENTS

			1. Global
			2. Login
			3. Forgot Password
			4. Camera
	*/



	// 1. Global
	container: {
		flex: 1,
		backgroundColor: '#fff',
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

	headingContainer: {
		bottom: deviceHeight - (deviceHeight * 0.0925),
		left: deviceWidth - (deviceWidth * 0.1),
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
	},




	// 4. Camera
	captureButton: {
		width: deviceWidth * 0.16,
		height: deviceWidth * 0.16,
		opacity: 0.5,
		borderRadius: deviceWidth * 0.08,
		borderWidth: 3,
		borderColor: '#fff',
		zIndex: 100,
		position: 'absolute',
		alignSelf: 'center',
    	bottom: (deviceHeight / 30),	},

	shutterIcon: {
		color: '#fff',
		fontSize:deviceWidth * 0.145,
	},

	blinkTrue: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'stretch',
		justifyContent: 'flex-end',
		height: deviceHeight,
		width: deviceWidth,
		opacity: 0.5,
		zIndex: 50,
	},

	blinkFalse: {
		flex: 1,
		backgroundColor: 'transparent',
		alignItems: 'stretch',
		justifyContent: 'flex-end',
		height: deviceHeight,
		width: deviceWidth,
	},

	flipCamera: {
	  	color: '#fff',
	    backgroundColor: 'transparent',
	},

	cameraContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#000',
		justifyContent: 'flex-end',
		alignSelf: 'stretch',
		height: deviceHeight,
		width: (deviceHeight * 0.75),
		position: 'absolute',
	},

})
