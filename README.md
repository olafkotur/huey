# Huey: React Native

## Pre-setup
* You must install expo tools before setting up the project, assuming you have `npm` installed
* `npm install expo-cli --global`

## Setup
* Make sure to be in your desired directory
* `git clone git@github.com:olafkotur/huey.git`
* `npm install` Do this each time package.json has changed, installs all relevant node_modules
* `expo start` Starts the local server
* `?` to get more available options

## View App
* Using your phone, download the expo client app and scan the barcode in terminal after running `expo start`
* Using a simulator, follow the instructions in terminal after running `expo start`

## Folders
* `.expo/` Local server settings used by expo
* `assets/` Used for app icons when app is published
* `components/` Reusable components and screens written for use of Huey
* `node_modules/` Libraries installed using npm specified in `package.json`
* `static/` Images and other media used by the app


## How it works
When the app is loaded in the first file that is read is `App.js` inside this file we have
declared a number of other components (screens) as AppRouter. When we then call the AppRouter
it simply takes the first component that is loaded. In this case it is the `LoginScreen`. 

The first half of the class are the functions these are declared as usual, React Native uses
JavaScript ES6 hence the function declartion as such: `foobar = () => {}` instead of `foobar() {}`.
For example the Login Screen uses a method handleSignup to allow a user to log in:

```javascript
handleLogin = async () => {
	await firebase
	.auth()
	.signInWithEmailAndPassword(this.state.email, this.state.password)
	.then(() => this.props.navigation.navigate('HomeScreen'))
	.catch(error => this.setState({errorCode: error.code}))
	console.log(this.state.errorCode)
}
```

We are able to sign in using an email and password using states to grab our data. States are
extremely useful as they allow us to hold data and trigger an update in our render at the same
time. For example `this.state.email` we are access the 'email' state in the current class. You 
will see states in every class, they are defined as such: 

```javascript
state = {
	email: 'hueyyapp@gmail.com',
	password: 'Testing1123',

	errorCode: '',
}
```

We can set a state by doing `this.setState({ password: 'helloWorld1123' })`. This will cause
the render function to update accordingly and show the user relevant information on the screen. 

The `render()` function plays an important part in React Native as it allows us to generate content
in similar way as we do with HTML. Using `<Views>` and other components we are able to create parents and children the way do so using HTML. For example: 

```javascript
render() {
	return (
		<View style = {styles.container}>

			{/* Camera Background */}
			<Camera 
				ref = { ref => { this.camera = ref; }} 
				style = { styles.cameraContainer } 
				type = {this.state.cameraType} >
			</Camera>

			{/* Toggle Camera */}
			<View style = {styles.headingContainer}>
				<TouchableOpacity
					style = {styles.devButtonSmall}
					onPress = {() => this.toggleCamera()} >
				</TouchableOpacity>
			</View>

			{/* Capture */}
			<TouchableOpacity
				style = {styles.captureButton} 
				onPress = {() => this.capturePhoto()} >
			</TouchableOpacity>

		</View>
	);
}
```

Similar to HTML we can attach styling to anything using something very similar to CSS. We are able to declare a stylesheet and apply all kinds of styling props to any object. This can be found in the `Styles.js` file and is essentially a great long list of styling instructions for the whole app. 

```javascript
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
}
```
