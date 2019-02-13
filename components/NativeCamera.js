import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, CameraRoll, Dimensions } from 'react-native';
import { Camera, Permissions, Location, FileSystem, ImageManipulator } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Progress from 'react-native-progress';
import * as firebase from "firebase";
import DropdownAlert from 'react-native-dropdownalert';
import { Tooltip } from 'react-native-elements';

import styles from "../Styles";
import FileHandler from './FileHandler';
import QRCodeGenerator from './QRCodeGenerator'

export default class NativeCamera extends React.Component {

	state = {
		cameraPermission: null,
		locationPermission: null,
		cameraType: Camera.Constants.Type.back,
		isRecording: false,
		blinkStyle: styles.blinkFalse,
		cameraFlash: Camera.Constants.FlashMode.off,
		flashIcon: "flash-off",
		flipCameraIcon: "camera-rear",
		oneTimePWValidated: false,
		renewableQRValidated: false,
		qrIcon: '',
		qrInformation: ' '
	}

	componentDidMount = async () => {
		// Ask Permissions
		await Permissions.askAsync(Permissions.AUDIO_RECORDING);
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({cameraPermission: status === 'granted'});
		const { locstatus } = await Permissions.askAsync(Permissions.LOCATION)
		this.setState({locationPermission: locstatus === 'granted'});
	}

	processQRCodeOld = async (scanneroutput) =>
	{
		//Extract Critical Data Portion From QR Code //Date Form -> NameOfHosst - NumberUID
		codeportion = scanneroutput.data

		output1 = ((await firebase.database().ref('/organisers' + '/' + codeportion.slice(0,13)).once('value')))
		output2 = ((await firebase.database().ref('/protestpassword').once('value')))
		output2original = output2//(0,output2.length)
		output3 = ((codeportion.slice(0,13)))
		output4 = ((codeportion.slice(13,128)))

		//Terminal Logging Feedback
		console.log('00')
		console.log(codeportion)
		console.log(1)
		console.log(output1.val())
		console.log(2)
		console.log(output2original.val())
		console.log(3)
		console.log(output3)
		console.log(4)
		console.log(output4)

		if(output1.val() == output4){
			this.state.renewableQRValidated = true
			console.log('FOUND INDIVIDUAL QR CODE')
		}
		else if(output2.val() == codeportion){
			this.state.oneTimePWValidated = true
			console.log('AUTHORISED BY ' + output3 + "QR")
		}
		else{
				console.log("JUNK QR CODE")
		}

	}

	processQRCode = async (scanneroutput) =>
	{

		codeportion = scanneroutput.data
		console.log("Code Portion")
		console.log(codeportion)

		//Extract Critical Data To Process Protest Password
		//Dependencies are on the path being 15 Characters - This Can However Be Adapted For The Final Schema
		protestpasswordpathkeyQR = codeportion.slice(0,15)
		protestpasswordvalueQR = codeportion.slice(15,143)
		qrCodeInstance = new QRCodeGenerator()
		protestpassworddecrypt = qrCodeInstance.DecryptKEYString(protestpasswordvalueQR)

		//QR is protestpasswordzeV72hhtFLvUr71j0GbKnz8ENPOvquIQwgkpyd6LeCMUI3sGsEzn9sTHMfln8GDkcL8nsqNL1yac5206IrtQ55oNYI9XNhVmfHRJvSwxPO0QJGzcaKMTatU76dI6gdyS
		//True value is
		//Based off the given key offered attempts to read the firebase database at that location and return the value therein
		//this key will be Null if key is invalid
		//OriginalString  => zV2hFvr10bn8NOqIwky6eMIssz9TMl8Dc8sN1a50It5oY9NVfRvwP0JzaMaU6Igy
		//EncryptedtString  => zeV72hhtFLvUr71j0GbKnz8ENPOvquIQwgkpyd6LeCMUI3sGsEzn9sTHMfln8GDkcL8nsqNL1yac5206IrtQ55oNYI9XNhVmfHRJvSwxPO0QJGzcaKMTatU76dI6gdyS
		// EncryptedString  => zeV72hhtFLvUr71j0GbKnz8ENPOvquIQwgkpyd6LeCMUI3sGsEzn9sTHMfln8GDkcL8nsqNL1yac5206IrtQ55oNYI9XNhVmfHRJvSwxPO0QJGzcaKMTatU76dI6gdyS
		// DecryptedtString  => zV2hFvr10bn8NOqIwky6eMIssz9TMl8Dc8sN1a50It5oY9NVfRvwP0JzaMaU6Igy
		firebaseprotestpassword = (await firebase.database().ref('/' + protestpasswordpathkeyQR).once('value'))
		firebaseprotestpassword = firebaseprotestpassword.val()

		if(firebaseprotestpassword == protestpassworddecrypt){

			this.setState({oneTimePWValidated: true, qrIcon: 'qrcode', qrInformation: 'You\'ve scanned a public QR code.'})
			console.log('FOUND INDIVIDUAL QR CODE')
			console.log("Protest Password Identified")
		}

		//2.Extract Critical Data To Protest Organiser Password
		//Dependencies are on the path being 24 Characters - This Can However Be Adapted For The Final Schema
		organiserpasswordpathkeyQRa = codeportion.slice(0,10)
		organiserpasswordpathkeyQRb = codeportion.slice(10,24)
		organiserpasswordvalueQR = codeportion.slice(24,152)
		organiserpassworddecrypt = qrCodeInstance.DecryptKEYString(organiserpasswordvalueQR)

		firebaseorganiserpassword = (await firebase.database().ref( '/' + organiserpasswordpathkeyQRa + '/' + organiserpasswordpathkeyQRb).once('value'))
		firebaseorganiserpassword = firebaseorganiserpassword.val()

		if(organiserpassworddecrypt == firebaseorganiserpassword){
			this.setState({renewableQRValidated: true, qrIcon: 'qrcode-scan', qrInformation: 'You\'ve scanned an organiser QR code.'})
			console.log('FOUND ORGANISER RENEWABLE QR CODE')
			console.log('ORGANISER PROTEST PASSWORD IDENTIFIED')
		}
	}

	// Toggles front and back cameras
	toggleCamera = () => {
		if (this.state.cameraType === Camera.Constants.Type.back) { // Back
			this.setState({cameraType: Camera.Constants.Type.front, flipCameraIcon: "camera-front"})
		}
		else {
			this.setState({cameraType: Camera.Constants.Type.back, flipCameraIcon: "camera-rear"})
		}
	}

	// Toggles flash
	toggleFlash = () => {
		if (this.state.cameraFlash === Camera.Constants.FlashMode.off) { // Back
			this.setState({cameraFlash: Camera.Constants.FlashMode.auto, flashIcon : "flash-auto"})
		}
		else if (this.state.cameraFlash === Camera.Constants.FlashMode.auto){
			this.setState({cameraFlash: Camera.Constants.FlashMode.on, flashIcon : "flash-on"})
		}
		else {
			this.setState({cameraFlash: Camera.Constants.FlashMode.off, flashIcon : "flash-off"})
		}
	}

	//Returns The Co-ordinates Of The Protest Rally Point
	readLocationFromFirebase = async () => {
		let latraw = await (firebase.database().ref('/locationcoordinates/lat').once('value'))
		let longraw = await (firebase.database().ref('/locationcoordinates/long').once('value'))
		const latread = latraw.val()
		const longread = longraw.val()
		return {latread,longread}
	}

	//Wraps All Location Data Calls to Firebase & Local Device GPS - Geolocation Calls Are Made Within
	locationReadingWrapper = async (pathtofile, action) =>
	{
		console.log("Before Await getCurrent Position Call")
		navigator.geolocation.getCurrentPosition(
			async (position) =>
			{
				console.log("Enters getCurrent Position")
				console.log(JSON.stringify(position))
				const longrawreading = await JSON.stringify(position.coords.longitude)
				const latrawreading = await JSON.stringify(position.coords.latitude)
				const longread = await parseFloat(longrawreading)
				const latread = await parseFloat(latrawreading)

				externalreadingtuple = await this.readLocationFromFirebase()

				console.log("ExternalReadingTuple [lat/long]")
				console.log(externalreadingtuple.latread, externalreadingtuple.longread)
				console.log("LocationReadingTuple [lat/long]")
				console.log(latread, longread)

				if((latread - 0.5) <= externalreadingtuple.latread && externalreadingtuple.latread <= (latread + 0.5))
				{
					console.log("Latitude In Tolerance")
					if((longread - 0.5) <=  externalreadingtuple.longread && externalreadingtuple.longread <= (longread + 0.5))
					{
						console.log("Longitude In Tolerance")
						this.saveInCloud(pathtofile, action);
					}
				}
			},
				(error) => console.log(error),
				{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },	);
					console.log("REACHED END OF LOCATION WRAPPER - RESPONSIBILITY TRANSFERED TO CALLBACKS")
	}
//1 TIME PW
	//GENERATE 1 STRING OF 32 C
		//THE FIRST SECTION OF THE STRING -> MUST CONTAIN ALL THE DIRECTORY PATH INFORMATION & FINAL KEY AT THE BOTTOM OF THE DIRECTORY
			//UID KEY STORED IN FIREBASE FOR EACH PROTEST ->MUST<- BE OF A FIXED length

//	Tier1qrCodeGenerator(nameofprotest)
	//	UID = generatedUID(nameofprotest) // Generated UID Must Return A String of a fixed length to be the UID In Firebase (Recommended 32 char)


	handleRecording = async (action) => {
		//Switch Off Recording
		if (this.state.isRecording === true) {
			this.camera.stopRecording();
			this.setState({isRecording: false});
		}

		// Capture Photo & Store Locally
		else if (action === 'photo' && this.camera) {
			let options = {quality: 0.1}
			try {
				this.setState({blinkStyle: styles.blinkTrue});
				await this.camera.takePictureAsync(options).then((file) => {
					// Flashes screen
					setTimeout(() => {
						this.setState({blinkStyle: styles.blinkFalse});
					}, 150);
						this.saveLocally(file.uri);
						if(this.validationCheckReport() == true)
						{
							console.log
							this.locationReadingWrapper(file.uri, action)
						}
						else {
							console.log("LACKED PRE VALIDATION")
						}
				});
			} catch (error) {
				console.log(error.message);
			}
		}

		// Capture video & Store Locally
		else if (action === 'video' && this.state.isRecording === false && this.camera) {
			try {
				this.setState({isRecording: true});
				await this.camera.recordAsync().then((file) => {
						this.saveLocally(file.uri);
						if(this.validationCheckReport() == true)
						{
							this.locationReadingWrapper(file.uri, action)
						}
						else{
							console.log("LACKED PRE VALIDATION")
						}
				});
			} catch (error) {
				console.log(error.message);
			}
		}
	}

	// Capture video or photo & checks Location Eliggibility @ Capture
	captureMedia = async (action) => {
		//this.validationCheckReport()
		await this.handleRecording(action)
	}

	//Validation Railure Reporting
	validationCheckReport = () => {
		if(this.state.oneTimePWValidated == false || this.state.renewableQRValidated == false){
			let errormessage = ''
			if(this.state.oneTimePWValidated == false){
				errormessage = (errormessage + " - Passcode Verification Needed")
				console.log("TIER 1 VALIDATION FAIL")
			}
			if(this.state.renewableQRValidated == false){
				errormessage = (errormessage + " - Organiser Verification Needed")
				console.log("TIER 2 ORGANISER VALIDATION FAIL")
			}
			//this.dropdown.alertWithType('error',"Validation Needed For External Push", errormessage)
			console.log(errormessage)
			console.log("VALIDATION - About to return false")
			return false
		}
		console.log("VALIDATION - About to return true")
		return true
	}

	// Saves specified uri to the camera roll
	saveLocally = async (uri) => {
		let result = await ImageManipulator.manipulateAsync(uri, [{rotate: 0}], {});
		CameraRoll.saveToCameraRoll(result.uri);
	}


	// Sends to firebase as backup
	saveInCloud = (uri, action) => {
		console.log("Cloud Save Push For -> " + action)
		const extension = (action === 'photo') ? '.png' : '.mp4';
		const name = Date.now().toString() + extension;
		Handler = new FileHandler();
		Handler.uploadMedia(uri, name);
	}

	render() {

		// Camera Access Denied
		if (this.state.cameraPermission === null || this.state.cameraPermission === false) {
			return (
				<View style = {styles.container}>
					<Text>No access to camera</Text>
				</View>
			);
		}

		// Camera Access Granted
		else {
			return (
				<View style = {this.state.blinkStyle}>

					{/* Camera Background */}
					<Camera
						ref = { ref => { this.camera = ref; }}
						style = {styles.cameraContainer}
						ratio = {"16:9"}
						type = {this.state.cameraType}
						flashMode = {this.state.cameraFlash}
						onBarCodeScanned = {(result) => this.processQRCode(result)} >
					</Camera>

					<View style = {styles.swipeOverlay}>
					</View>

					{/*Toggle Flash*/}
					<View style = {this.state.cameraType === Camera.Constants.Type.back ? styles.cameraFlash : styles.cameraFlashDisabled} pointerEvents = {this.state.cameraType == Camera.Constants.Type.back ? 'auto' : 'none'}>
						<TouchableOpacity
							onPress = {() => this.toggleFlash()} >
							<Icon name={this.state.flashIcon} style = {styles.flipCamera}  size = {30} />
						</TouchableOpacity>
					</View>

					{/* Toggle Camera */}
					<View style = {styles.flipCameraButton}>
						<TouchableOpacity
							onPress = {() => this.toggleCamera()}  >
							<Icon name={this.state.flipCameraIcon} style = {styles.flipCamera}  size = {30} />
						</TouchableOpacity>
					</View>

					<View
						style = {styles.qrCodeButton} >
						<Tooltip
							popover={<Text>{this.state.qrInformation}</Text>}>
							<IconMCI name={this.state.qrIcon} style = {styles.qrCodeIcon}/>
						</Tooltip>
					</View>

					<TouchableOpacity
						style = {styles.captureButton}
						onPress = {() => this.captureMedia('photo')}
						onLongPress = {() => this.captureMedia('video')} >
					</TouchableOpacity>

					<View style = {styles.captureProgressContainer}>
						<Progress.CircleSnail
							style = {styles.captureProgressCircle}
							color={['#27ae60']}
							spinDuration = {1}
							thickness = {4}
							hidesWhenStopped = {true}
							duration = {1000}
							animating = {this.state.isRecording}
							indeterminate = {true}
							spinDuration = {900}
							size = {Dimensions.get('window').width * 0.18 + 20} >
						</Progress.CircleSnail>
					</View>

				</View>
			);
		}
	}
}
