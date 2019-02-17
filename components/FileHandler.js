import React from 'react';
import { FileSystem } from 'expo';
import * as firebase from "firebase";
import moment from 'moment';

export default class FileHandler extends React.Component {

	state = {

	}

	// Deletes media from firebase
	deleteFileDB = async (fileName) => {
		const uid = await firebase.auth().currentUser.uid;
		const storageRef = await firebase.storage().ref('users/' + uid + '/media/' + fileName);
		let databaseRef = await firebase.database().ref('users/' + uid + '/media');

		const filetimestamp = moment.unix(Math.ceil(parseFloat(fileName)/1000))
		console.log("filetimestamp -> " + filetimestamp)
		const systemtimestamp = moment.unix()

		// Delete from storage and database
		if(systemtimestamp - filetimestamp > 5259600)
		{
			await databaseRef.once('value', async snapshot => {
				snapshot.forEach((child) => {
					if (child.val().url.includes(fileName)) {
						databaseRef.update({[child.key]: null});
						storageRef.delete();
						return 0;
					}
				});
			});
		}
		else
		{
			//overtime = moment.unix((5259600 + filetimestamp))
			overtime = 5259600 + filetimestamp
			console.log("OverTime -> " + overtime)
			return 5259600 + filetimestamp
		}
	}

	deleteFileLocal = async (fileName) => {
		let uri = FileSystem.documentDirectory + fileName;
		FileSystem.deleteAsync(uri, {});
	}

	getLocalFile = async (fileName, url) => {
		let uri = FileSystem.documentDirectory + fileName;

		// Check if file exists
		await FileSystem.getInfoAsync(uri).then((information) => {
			if (information.exists) uri = information.uri; // Use existing
			else FileSystem.downloadAsync(url, uri).then((info) => uri = info.uri); // Download and cache
		});
		return uri;
	}

	// Returns media from firebase, enter param 'media' or 'audio'
	getMedia = async (destination) => {
		const dest = (destination === 'audio') ? '/audio/' : '/media/';
		const uid = await firebase.auth().currentUser.uid;
		const ref = await firebase.database().ref('users/' + uid + dest);
		let media = [];

		// Get URLs from database
		await ref.once('value', snapshot => {
			if (snapshot.exists()) {
				media = Object.values(snapshot.val());
			}
		});
		return media;
	}


	// Uploads URI to firebase
	uploadMedia = async (uri, name) => {
		// Choose destination folder, either /audio or /media
		let dest = (name.includes('.mp3')) ? '/audio/' : '/media/';

		// Prepare blob
		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function() {
				resolve(xhr.response);
			};
			xhr.onerror = function(e) {
				console.log(e);
				reject(new TypeError('Network request failed'));
			};
			xhr.responseType = 'blob';
			xhr.open('GET', uri, true);
			xhr.send(null);
		});

		// Create references
		const uid = await firebase.auth().currentUser.uid;
		const storageRef = await firebase.storage().ref('users/' + uid + dest + name);
		const databaseRef = await firebase.database().ref('users/' + uid + dest);

		// Upload image to firebase storage and url to database
		await storageRef.put(blob).then(async () => {
			await databaseRef.push({
				url: await storageRef.getDownloadURL()
			})
		}).catch((error) => console.log(error));
	}
}
