import React from 'react';
import uuid from 'uuid';
import * as firebase from "firebase";

export default class FileHandler extends React.Component {


	state = {

	}

	// Returns media from firebase
	getMediaAsync = async () => {
		const uid = await firebase.auth().currentUser.uid;

		// Get images and videos

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

		// Upload to firebase
		const uid = await firebase.auth().currentUser.uid;
		await firebase
			.storage()
			.ref('users/' + uid + 'media/' + name)
			.put(blob)
			.then(() => blob.close())
			.catch((error) => console.log(error));
	}
}