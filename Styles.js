import React, { StyleSheet, Platform, Dimensions } from 'react-native';

/* --------- Colour Chart ---------
*
*
	Huey Green: 	#27ae60
	Almost White: 	#F6F6F6
	Almost Black: 	#2f3640
	Divider Grey: 	#F1F1F1
	Flat Blue: 		#0097e6
	Flat Red: 		#e84118
	Flat Yellow: 	#fbc531
	Black Text: 	#22292f
	Dark Grey: 		#4B4B4B
*
*
*/

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


	/*
	*
	*
		The code above is made purely to get back end functionality to
		work please do move, modify, delete anything that is not needed
		for front end. Note that a lot of this is brute forced to speed
		up backend so it will have to be changed.

----- TABLE OF CONTENTS -----

			1. Global
			2. Login
			3. Forgot Password
			4. Camera
			5. HomeScreen
			6. Settings
      		7. Gallery
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

	navbarContainer: {
		width: deviceWidth,
		height: deviceHeight * 0.075,
		backgroundColor: '#27AE60',
		flexDirection: 'row',
		alignItems: 'flex-end',
	},

	navbarGalleryContainer: {
		width: deviceWidth,
		height: deviceHeight * 0.075,
		backgroundColor: '#27AE60',
		flexDirection: 'row',
		alignItems: 'flex-end',
		bottom: (deviceHeight * 0.465),
    zIndex:100,
	},

	navbarBackContainer: {
		backgroundColor: 'transparent',
		width: deviceWidth * 0.15,
		height: deviceHeight * 0.075,
	},

	navbarRightContainer: {
		backgroundColor: 'transparent',
		flexDirection: 'row-reverse',
		width: deviceWidth * 0.75,
		height: deviceWidth * 0.075,
		top: -deviceHeight * 0.0175,
		left: deviceWidth * 0.12,
		backgroundColor: 'transparent',
	},

	navbarButton: {
		backgroundColor: "transparent",
		left: deviceWidth * 0.03,
		marginRight: 10,
		marginLeft: 10,
	},

	navbarIcon: {
		fontSize: deviceHeight * 0.0375,
		color: "#fff",
	},

	navbarBackIcon: {
		fontSize: deviceHeight * 0.045,
		color: "#fff",
		top: deviceHeight * 0.015,
		right: deviceWidth * 0.025,
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

	topLeftButton: {
		width: 30,
		height: 30,
		opacity: 0.9,
		zIndex: 100,
		position: 'absolute',
		alignSelf: 'center',
	    fontSize:50,
	    top:deviceHeight/59,
		left:(deviceWidth / 35),
	},

	topLeftButtonIcon: {
	    fontSize:50,
	    fontSize:deviceHeight/25,
	},

	hide: {
		opacity: 0,
		zIndex: -10000,
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


//	4. Camera

	flipCameraButton: {
		width: deviceWidth * 0.065,
		height: deviceWidth * 0.065,
		bottom: deviceHeight * 0.94,
		left: deviceWidth * 0.89,
	},

	flipCamera: {
	    color: '#fff',
	    backgroundColor: 'transparent',
	    fontSize: deviceWidth * 0.065,
	},

	cameraContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#000',
		justifyContent: 'flex-end',
		alignSelf: 'stretch',
		height: deviceHeight,
		width: (deviceHeight * 0.5625),
		position: 'absolute',
	},

	cameraParentContainer: {
		flex: 1,
		backgroundColor: '#000',
		alignItems: 'stretch',
		justifyContent: 'flex-end',
		height: deviceHeight,
		width: deviceWidth,
	},

	captureButton: {
		width: deviceWidth * 0.18,
		height: deviceWidth * 0.18,
		opacity: 0.5,
		borderRadius: deviceWidth * 0.09,
		borderWidth: 4,
		borderColor: '#fff',
		zIndex: 100,
		position: 'absolute',
		alignSelf: 'center',
	    bottom: (deviceHeight / 30),
	},

  	shutterIcon: {
    	color: '#fff',
    	fontSize:deviceWidth * 0.145,
  	},

	videoButton: {
		width: deviceWidth * 0.08,
		height: deviceWidth * 0.08,
		opacity: 0.9,
		borderRadius: deviceWidth * 0.04,
		borderWidth: 3,
		borderColor: 'red',
		zIndex: 100,
		position: 'absolute',
		alignSelf: 'center',
		top: deviceHeight - (deviceHeight * 0.055),
		left: deviceWidth - (deviceWidth * 0.4),
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

	captureProgressContainer: {
		alignItems: 'center',
	},

	captureProgressCircle: {
		 bottom: (deviceHeight / 30) - 10,
	 },


//	5. HomeScreen
	audioButton: {
		width: deviceWidth * 0.08,
		height: deviceWidth * 0.065,
		opacity: 0.9,
		zIndex: 100,
		position: 'absolute',
		alignSelf: 'center',
		bottom: deviceHeight * 0.03,
		left: deviceWidth * 0.30,
	},


	folderButton: {
	    width: deviceWidth * 0.08,
		height: deviceWidth * 0.065,
		opacity: 0.9,
		zIndex: 100,
		position: 'absolute',
		alignSelf: 'center',
		bottom: deviceHeight * 0.03,
	    left: deviceWidth * 0.06,
	},

  	folderIcon: {
	    color: '#fff',
	    backgroundColor: 'transparent',
	    fontSize: deviceWidth * 0.08,
	},

	settingsButton: {
		width: deviceWidth * 0.065,
		height: deviceWidth * 0.065,
		opacity: 0.9,
		zIndex: 100,
		position: 'absolute',
		alignSelf: 'center',
		bottom: deviceHeight * 0.94,
		left: deviceWidth * 0.04,
	},

	settingsIcon: {
		color: '#fff',
	    backgroundColor: 'transparent',
	    fontSize: deviceWidth * 0.065,
	},


//	6. Settings

	settingsMenuContainer: {
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
	},

	settingsRecordingIcon: {
		color: '#27ae60',
	    backgroundColor: 'transparent',
	    fontSize: deviceWidth * 0.065,
	    top: deviceHeight * 0.06,
	},

	settingsLibraryIcon: {
		color: '#0097e6',
	    backgroundColor: 'transparent',
	    fontSize: deviceWidth * 0.065,
	    top: deviceHeight * 0.06,
	},

	settingsAppearanceIcon: {
		color: '#e84118',
	    backgroundColor: 'transparent',
	    fontSize: deviceWidth * 0.065,
	    top: deviceHeight * 0.06,
	},

	settingsSecurityIcon: {
		color: '#fbc531',
	    backgroundColor: 'transparent',
	    fontSize: deviceWidth * 0.065,
	    top: deviceHeight * 0.06,
	},

	settingsAboutIcon: {
		color: '#2f3640',
	    backgroundColor: 'transparent',
	    fontSize: deviceWidth * 0.065,
	    top: deviceHeight * 0.06,
	},

	settingsMenuButton: {
		width: deviceWidth * 0.8,
		height: deviceHeight * 0.15,
		backgroundColor: "#0000",
		borderBottomColor: "#F1F1F1",
		borderBottomWidth: 2,
	},

	settingsMenuTitleText: {
		fontSize: deviceHeight * 0.024,
		left: deviceWidth * 0.1,
	    top: deviceHeight * 0.015,
	    fontWeight: "bold",
	    color: '#22292f',
	},

	settingsMenuSubtitleText: {
		fontSize: deviceHeight * 0.02,
		left: deviceWidth * 0.1,
		top: deviceHeight * 0.0125,
		color: '#4B4B4B',
		marginRight: deviceWidth * 0.25,
	},

	settingsRightArrow: {
		left: deviceWidth * 0.725,
		top: -deviceHeight * 0.05,
		color: '#4B4B4B',
	},


// 7. Gallery

	galleryContainer: {
		height: deviceHeight - ((deviceHeight / 8) + (deviceHeight / 15)),
		width: deviceWidth * 0.9,
		backgroundColor: 'transparent',
		position: 'absolute',
		bottom: 0 + (deviceHeight / 15),
	},

	singleGalleryImage: {
		width: (deviceWidth * 0.3)-4,
		height: (deviceWidth * 0.3) - 4,
	    margin:2,
  },

	bottomBar: {
		width: deviceWidth,
		height: deviceHeight / 15,
		bottom:0,
		position:'absolute',
		zIndex:100,
		backgroundColor: '#27AE60'
	},

	focusedGalleryImage: {
		width: deviceWidth,
		height: deviceHeight,
		position: 'absolute',
	},

	imageSelected: {
		borderColor: "#000066",
    	backgroundColor: "#000066",
    	borderWidth: 10,
    	borderRadius: 10
	},

	videoControl: {
		color: 'white',
		fontSize: deviceWidth * 0.1,
		marginRight: deviceWidth * 0.075,
		marginLeft: deviceWidth * 0.075,
		marginTop: deviceHeight * 0.02,
	},

	playPauseButton: {
		fontSize: deviceWidth * 0.175,
		color: '#fff',
	},

	videoButtonContainer: {
		zIndex: 100,
		flexDirection: 'row',
		alignSelf: 'center',
		top: deviceHeight * 0.89,
		position: 'absolute',
	},

	imageButtonContainer: {
		zIndex: 100,
		flexDirection: 'row',
		alignSelf: 'center',
		top: deviceHeight * 0.925,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		width: deviceWidth,
		height: deviceHeight * 0.075,
		backgroundColor: '#0005',
	},

	imageControl: {
		color: 'white',
		fontSize: deviceWidth * 0.075,
		marginRight: deviceWidth * 0.1,
		marginLeft: deviceWidth * 0.1,
	},

	galleryViewTopButtons: {
		zIndex: 100,
		flexDirection: 'row',
		alignSelf: 'center',
		width: deviceWidth,
		position: 'absolute',
		backgroundColor: '#0005',
		height: deviceHeight * 0.07,
	},

	galleryBackButton: {
		color: '#fff',
		fontSize: deviceWidth * 0.1,
		marginTop: deviceHeight * 0.01,
		marginLeft: deviceWidth * 0.01,
	},

	galleryMenuButton: {
		color: '#fff',
		fontSize: deviceWidth * 0.075,
		marginTop: deviceHeight * 0.0175,
		marginLeft: deviceWidth * 0.775,
	},


// 8. Audio Recording

	buttonContainer: {
	  width: deviceWidth * 0.4,
	  height: deviceWidth * 0.4,
	  opacity: 1,
	  zIndex: 100,
	  position: 'absolute',
	  alignSelf: 'center',
	  top: ((deviceHeight / 2) - ((deviceWidth * 0.4)/2)),

	},

	audioRecordButton: {
	  width: deviceWidth * 0.4,
	  height: deviceWidth * 0.4,
	  opacity: 1,
	  borderRadius: deviceWidth,
	  borderWidth: 10,
	  borderColor: '#4B4B4B',
	  position: 'absolute',
	  alignSelf: 'center',
	},

	audioRecordButtonMic: {
	  fontSize: deviceWidth /5,
	  alignSelf: 'center',
	  top:(deviceWidth / 13),
	  color: '#2f3640',
	},

	audioRecordingButton: {
	  width: deviceWidth * 0.4,
	  height: deviceWidth * 0.4,
	  opacity: 1,
	  borderRadius: deviceWidth,
	  borderWidth: 10,
	  borderColor: 'red',
	  color: 'red',
	  position: 'absolute',
	  alignSelf: 'center',
	},

	hideButton: {
	  opacity: 0.9,
	  zIndex: 100,
	  position: 'absolute',
	  alignSelf: 'center',
	  fontSize:deviceHeight/25,
	  top:deviceHeight/90,
	  right:(deviceWidth / 50),
	},

})
