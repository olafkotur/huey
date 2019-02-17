import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { FileSystem, Video } from 'expo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropdownAlert from 'react-native-dropdownalert';

import FileHandler from './FileHandler';
import styles from "../Styles";
import moment from 'moment';

export default class FocusedImage extends React.Component {

	static navigationOptions = {
		header: null,
		gesturesEnabled: true,
	}

	state = {
		uri: '',
		fileName: '',
		fileType: '',
		isProccesing: true,
		shouldPlay: true,
		pausePlayIcon: "pause-circle-filled"
	}

	componentWillMount = async () => {
		// Grabs image from local storage
		const fileName = this.props.navigation.getParam('uri', '').split('media%2F').pop().split('?')[0];
		const uri = FileSystem.documentDirectory + fileName;
		this.setState({
			uri: uri,
			fileName: fileName,
			isProcessing: false,
			fileType: this.props.navigation.getParam('fileType', ''),
			shouldPlay: true,
		});
	}

	playPauseVideo = () => {
		if (this.state.shouldPlay === true) {
			this.setState({shouldPlay: false})
			this.setState({pausePlayIcon: "play-circle-filled"})
		}
		else {
			this.setState({shouldPlay: true})
			this.setState({pausePlayIcon: "pause-circle-filled"})
		}
	}

	deleteMedia = () => {
		const Handler = new FileHandler();
		deletionresult = Handler.deleteFileDB(this.state.fileName);
		console.log(deletionresult.overtime)
		console.log("Deletion Result EXPECTED AFTER -> " + deletionresult)
		if(deletionresult > 0)
		{
		//	console.log(deletionresult)
			//console.log(deletionresult.val)
			//console.log(deletionresult.value())
			console.log(deletionresult.format('MMMM Do YYYY, h:mm:ss'))
			console.log("Message Expcted In Alert - > " + deletionresult.format('MMMM Do YYYY, h:mm:ss'))
			var printout = "Can Be Deleted From"
			printout = printout.concat(deletionresult.format('MMMM Do YYYY, h:mm:ss'))
			this.dropdown.alertWithType('error', 'Content Is Secured For 60 days', printout)
		}

		Handler.deleteFileLocal(this.state.fileName);
		this.props.navigation.navigate('MediaGallery');
	}

	render() {
		if (this.state.isProcessing) return null;

		// Display photo
		else if (this.state.fileType === 'photo') {
			return (
				<View>
					<Image
						style = {styles.focusedGalleryImage}
						source = {{uri: this.state.uri}} >
					</Image>

					<View style = {styles.galleryViewTopButtons}>
						<TouchableOpacity
							onPress = {() => this.props.navigation.navigate('MediaGallery')}>
							<Icon name= "chevron-left" style = {styles.galleryBackButton}  size = {30} />
						</TouchableOpacity>
						<TouchableOpacity>
							<Icon name= "more-vert" style = {styles.galleryMenuButton}  size = {30} />
						</TouchableOpacity>
					</View>

					<View style = {styles.imageButtonContainer}>
						<TouchableOpacity>
							<Icon name= "edit" style = {styles.imageControl}  size = {30} />
						</TouchableOpacity>

						<TouchableOpacity
							onPress =	{() => this.deleteMedia()} >
							<Icon name = "delete-forever" style = {styles.imageControl}  size = {30} />
						</TouchableOpacity>

						<TouchableOpacity>
							<Icon name= "vpn-lock" style = {styles.imageControl} size = {30} />
						</TouchableOpacity>
					</View>

					<DropdownAlert ref={ref => this.dropdown = ref} />
				</View>
			);
		}

		// Display video
		else if (this.state.fileType === 'video') {
			return (
				<View>

					<Video
						source = {{ uri: this.state.uri }}
						rate = {1.0}
						volume = {1.0}
						isMuted = {true}
						shouldPlay = {this.state.shouldPlay}
						resizeMode = 'cover'
						isLooping
						style = {styles.focusedGalleryImage} >
					</Video>

					<View style = {styles.galleryViewTopButtons}>
						<TouchableOpacity
							onPress = {() => this.props.navigation.navigate('MediaGallery')}>
							<Icon name= "chevron-left" style = {styles.galleryBackButton}  size = {30} />
						</TouchableOpacity>
						<TouchableOpacity>
							<Icon name= "more-vert" style = {styles.galleryMenuButton}  size = {30} />
						</TouchableOpacity>
					</View>

					<View style = {styles.videoButtonContainer}>
						<TouchableOpacity>
							<Icon name= "replay-10" style = {styles.videoControl}  size = {30} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress =	{() => this.playPauseVideo()} >
							<Icon name = {this.state.pausePlayIcon} style = {styles.playPauseButton}  size = {30} />
						</TouchableOpacity>
						<TouchableOpacity>
							<Icon name= "forward-10" style = {styles.videoControl}  size = {30} />
						</TouchableOpacity>
					</View>
					<DropdownAlert ref={ref => this.dropdown = ref} />
				</View>
			);
		}
	}
}
