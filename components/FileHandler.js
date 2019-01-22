import React from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import * as firebase from "firebase";

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest= RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class FileHandler extends React.Component {


	state = {

	}

	getMedia = async () => {
		const uid = await firebase.auth().currentUser.uid;

		// Get images and videos

	}


	uploadMedia = async (uri) => {
		fs.readFile(uri, 'base64');
		const uid = await firebase.auth().currentUser.uid;
		await firebase
			.storage()
			.ref('users/' + uid + 'media/test.jpg')
			.put(file)
			.catch((error) => console.log(error));
	}
}