import React from 'react';
import { FileSystem } from 'expo';
import uuid from 'uuid';
import * as firebase from "firebase";

export default class FileHandler extends React.Component {


	state = {

	}

	// Deletes media from firebase
	deleteFileDB = async (fileName) => {
		const uid = await firebase.auth().currentUser.uid;
		const storageRef = await firebase.storage().ref('users/' + uid + '/media/' + fileName);
		let databaseRef = await firebase.database().ref('users/' + uid + '/media');

		// Delete from storage and database
		await databaseRef.once('value', async snapshot => {
			snapshot.forEach((child) => {
				if (child.val().url.includes(fileName)) {
					databaseRef.update({[child.key]: null});
					storageRef.delete();
					return true;
				}
			});
		});
	}

	deleteFileLocal = async (fileName) => {
		let uri = FileSystem.documentDirectory + fileName;
		FileSystem.deleteAsync(uri, {});
	}

	getLocalFile = async (fileName, url) => {
		let uri = FileSystem.documentDirectory + fileName;

		// Check if file exists
		await FileSystem.getInfoAsync(uri).then((information) => {
			if (information.exists) { 
				uri = information.uri; // Use existing
			}
			else {
				FileSystem.downloadAsync(url, uri).then((info) => {
					uri = info.uri; // Download and cache
				});
			}
		});
		return uri;
	}

	// Returns media from firebase
	getMedia = async () => {
		const uid = await firebase.auth().currentUser.uid;
		const databaseRef = await firebase.database().ref('users/' + uid + '/media/');
		let media = [];

		// Get URLs from database
		await databaseRef.once('value', snapshot => {
			if (snapshot.exists()) {
				media = Object.values(snapshot.val());
			}
		});
		return media;
	}


	// Uploads URI to firebase
	uploadMedia = async (uri, name) => {
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
		const storageRef = await firebase.storage().ref('users/' + uid + '/media/' + name);
		const databaseRef = await firebase.database().ref('users/' + uid + '/media/');
		
		// Upload image to firebase storage and url to database
		await storageRef.put(blob).then(async () => {
			await databaseRef.push({
				url: await storageRef.getDownloadURL()
			})
		}).catch((error) => console.log(error));
	}
}