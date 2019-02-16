import React from 'react';
import { Text, View, Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Overlay, Input, Button } from 'react-native-elements'
import styles from "../Styles";
import * as Firebase from '../Firebase';
import DropdownAlert from 'react-native-dropdownalert';


export default class SettingsScreen extends React.Component {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    state = {
        gestureName: 'none',
        showChangeEmail: false,
        showChangePassword: false,
        showDelAccount: false,
        passwordHidden1: true,
        passwordHidden2: true,
        passwordHidden3: true,
        passwordIcon1: 'eye',
        passwordIcon2: 'eye',
        passwordIcon3: 'eye',

        oldEmail: '',
        newEmail: '',
        confirmEmail: '',
        newPassword: '',
        confirmPassword: ''
    }

    render() {

        return (

            <GestureRecognizer
                onSwipeUp={() => this.props.navigation.navigate('HomeScreen')}
                config = {{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
                style = {{flex:1, backgroundColor: "#27ae60"}} >

                <KeyboardAwareScrollView
                    contentContainerStyle = {styles.container}
                    keyboardDismissMode = 'on-drag'
                    keyboardShouldPersistTaps = 'never'
                    scrollEnabled = {true}
                    enableAutomaticScroll = {false} >


                    {/*Navbar*/}
                    <View style = {styles.navbarGalleryContainer}>

                        <View style = {styles.navbarBackContainer}>
                            <TouchableOpacity
                                onPress = {() => this.props.navigation.navigate('HomeScreen')} >
                                <Icon name="chevron-left" style = {styles.navbarBackIcon}  size = {30} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/*-----------------MVP Settings Implementation-----------------*/}

                    {/*-----Change Email Overlay-----*/}
                    <Overlay
                        isVisible={this.state.showChangeEmail}
                        overlayStyle={styles.overlay}
                        onBackdropPress={() => this.setState({ showChangeEmail: false })}>
                        <View style={styles.textInput}>
                            <Text style={styles.overlayHeader}> Change Email </Text>
                            <Input
                                placeholder='Old Email Address'
                                inputStyle={styles.textInput}
                                onChangeText = {(email) => this.setState({oldEmail: email})}
                                leftIcon={
                                    <Icon
                                    name='email'
                                    size={30}
                                    color='#4B4B4B'
                                    style={styles.textFieldIcon}
                                    />
                                }
                            />
                            <Input
                                placeholder='New Email Address'
                                inputStyle={styles.textInput}
                                onChangeText = {(email) => this.setState({newEmail: email})}
                                leftIcon={
                                    <IconMCI
                                    name='email-outline'
                                    size={30}
                                    color='#4B4B4B'
                                    style={styles.textFieldIcon}
                                    />
                                }
                            />
                            <Input
                                placeholder='Confirm New Email Address'
                                inputStyle={styles.textInput}
                                onChangeText = {(email) => this.setState({confirmEmail: email})}
                                leftIcon={
                                    <IconMCI
                                    name='email-check-outline'
                                    size={30}
                                    color='#4B4B4B'
                                    style={styles.textFieldIcon}
                                    />
                                }
                            />
                            <Button
                                title="Submit"
                                type="outline"
                                titleStyle={styles.overlayButtonText}
                                buttonStyle={styles.overlayButton}
                                onPress={async () => {
                                    await Firebase.changeUserEmail(this.state.oldEmail, this.state.newEmail, this.state.confirmEmail)
                                    .then((result) => {
                                        if (result.error) this.dropdown.alertWithType('error', 'Error', result.error);
                                        else {
                                            this.dropdown.alertWithType('success', 'Updated', 'Email has been updated');
                                            this.setState({showChangeEmail: false});
                                        }
                                    });
                                }}
                            />
                        </View>

                    </Overlay>

                    {/*-----Change Password Overlay-----*/}
                    <Overlay
                        isVisible={this.state.showChangePassword}
                        overlayStyle={styles.overlay}
                        onBackdropPress={() => this.setState({ showChangePassword: false })}>
                        <View style={styles.textInput}>
                            <Text style={styles.overlayHeader}> Change Password </Text>
                            <Input
                                placeholder='New Password'
                                inputStyle={styles.textInput}
                                secureTextEntry={this.state.passwordHidden2}
                                onChangeText = {(password) => this.setState({newPassword: password})}
                                leftIcon={
                                    <Icon
                                        name='lock-outline'
                                        size={30}
                                        color='#4B4B4B'
                                        style={styles.textFieldIcon}/>}
                                        rightIcon={
                                            <IconMCI
                                                name={this.state.passwordIcon2}
                                                size={20}
                                                color='#4B4B4B'
                                                style={styles.textFieldIcon}
                                                onPress={() => {
                                                    if (this.state.passwordHidden2 === false) this.setState({passwordHidden2: true, passwordIcon2: 'eye-off-outline'});
                                                    else this.setState({passwordHidden2: false, passwordIcon2: 'eye'});
                                                }}
                                            />
                                }
                            />

                            <Input
                                placeholder='Confirm New Email Address'
                                inputStyle={styles.textInput}
                                secureTextEntry={this.state.passwordHidden3}
                                onChangeText = {(password) => this.setState({confirmPassword: password})}
                                leftIcon={
                                    <Icon
                                        name='lock-outline'
                                        size={30}
                                        color='#4B4B4B'
                                        style={styles.textFieldIcon}/>
                                }
                                rightIcon={
                                    <IconMCI
                                        name={this.state.passwordIcon3}
                                        size={20}
                                        color='#4B4B4B'
                                        style={styles.textFieldIcon}
                                        onPress={() => {
                                            if (this.state.passwordHidden3 === false) this.setState({passwordHidden3: true, passwordIcon3: 'eye-off-outline'});
                                            else this.setState({passwordHidden3: false, passwordIcon3: 'eye'});
                                        }}
                                    />
                                }
                            />
                            <Button
                                title="Submit"
                                type="outline"
                                titleStyle={styles.overlayButtonText}
                                buttonStyle={styles.overlayButton}
                                onPress={async () => {
                                    await Firebase.changeUserPassword(this.state.newPassword, this.state.confirmPassword)
                                    .then((result) => {
                                        if (result.error) this.dropdown.alertWithType('error', 'Error', result.error);
                                        else {
                                            this.dropdown.alertWithType('success', 'Updated', 'Password has been updated');
                                            this.setState({showChangePassword: false});
                                        }
                                    });
                                }}
                            />
                        </View>

                    </Overlay>

                    {/*-----Delete Account Overlay-----*/}
                    <Overlay
                        isVisible={this.state.showDelAccount}
                        overlayStyle={styles.overlayDelAccount}
                        onBackdropPress={() => this.setState({ showDelAccount: false })}>
                        
                        <View>
                            <Text style={styles.delOverlayText}> Are you sure you want to delete your account? </Text>
                            
                            <Button
                                title="Delete Account"
                                titleStyle={styles.delAccountBtnText}
                                buttonStyle={styles.delAccountBtnOverlay}
                                onPress={() => {
                                    Firebase.deleteUser().then(async (result) => {
                                        if (result.error) this.dropdown.alertWithType('error', 'Error', result.error);
                                        else this.props.navigation.navigate('LoginScreen');
                                    });
                                }}
                            />

                            <Button
                                title="Cancel"
                                type="outline"
                                titleStyle={styles.overlayDelButtonText}
                                buttonStyle={styles.overlayDelButton}
                                onPress={() => this.setState({ showDelAccount: false })}
                            />

                        </View>
                    </Overlay>

                    {/*-----Main Settings list-----*/}
                    <View style = {styles.settingsMenuContainer}>

                        {/* Change Email */}
                        <TouchableOpacity
                            style = {styles.settingsMenuBtn}
                            onPress = {() => this.setState({showChangeEmail: true})} >
                            <Icon name="email" style = {styles.settingsMenuBtnIcon} size = {30} />
                            <Text style={styles.settingsMenuBtnText}> Change Email </Text>
                            <Icon name="chevron-right" style={styles.settingsRArrow} size={30}/>
                        </TouchableOpacity>

                        {/* Change Password */}
                        <TouchableOpacity
                            style = {styles.settingsMenuBtn}
                            onPress = {() => this.setState({showChangePassword: true})} >
                            <Icon name="lock" style = {styles.settingsMenuBtnIcon} size = {30} />
                            <Text style={styles.settingsMenuBtnText}> Change Password </Text>
                            <Icon name="chevron-right" style={styles.settingsRArrow} size={30}/>
                        </TouchableOpacity>

                        <Button
                            title="Log Out"
                            type="outline"
                            titleStyle={styles.logoutBtnText}
                            buttonStyle={styles.logoutBtn}
                            onPress = {() => this.props.navigation.navigate('LoginScreen')}>
                        </Button>


                        <Button
                            title="DELETE ACCOUNT"
                            titleStyle={styles.delAccountBtnText}
                            buttonStyle={styles.delAccountBtn}
                            onPress = {() => this.setState({showDelAccount: true})} >
                        </Button>

                    </View>

{/* --------------Initial concept settings display--------------(PLease keep this comment far left so the code can be collapsed)
                    {/* Search Bar *
                    <TextInput
                        style = {styles.settingsSearchField}
                        secureTextEntry = {false}
                        placeholder = 'Search Settings'
                        placeholderTextColor = '#a9a9a9'
                        underlineColorAndroid = 'rgba(0,0,0,0)'>
                    </TextInput>

                    <Icon name="search" style = {styles.settingsSearchIcon} size = {30} />

                    <View style = {styles.settingsMenuContainer}>

                        {/* Recording Settings *
                        <TouchableOpacity
                            style = {styles.settingsMenuButton}
                            onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
                            <Icon name="movie-creation" style = {styles.settingsRecordingIcon}  size = {30} />
                            <Text style = {styles.settingsMenuTitleText}>Recording</Text>
                            <Text style = {styles.settingsMenuSubtitleText}>Quality, Default Format, Audio Recording...</Text>
                            <Icon name="chevron-right" style = {styles.settingsRightArrow}  size = {30} />
                        </TouchableOpacity>

                        {/* Library Settings *
                        <TouchableOpacity
                            style = {styles.settingsMenuButton}
                            onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
                            <Icon name="photo-size-select-actual" style = {styles.settingsLibraryIcon}  size = {30} />
                                                    <Text style = {styles.settingsMenuTitleText}>Library</Text>
                            <Text style = {styles.settingsMenuSubtitleText}>Storage Settings, Tags, Album Settings...</Text>
                            <Icon name="chevron-right" style = {styles.settingsRightArrow}  size = {30} />
                        </TouchableOpacity>

                        {/* Appearance Settings *
                        <TouchableOpacity
                            style = {styles.settingsMenuButton}
                            onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
                            <Icon name="brush" style = {styles.settingsAppearanceIcon}  size = {30} />
                            <Text style = {styles.settingsMenuTitleText}>Appearance</Text>
                            <Text style = {styles.settingsMenuSubtitleText}>Theme, Custom Colours, Accessibility...</Text>
                            <Icon name="chevron-right" style = {styles.settingsRightArrow}  size = {30} />
                        </TouchableOpacity>

                        {/* Security Settings *
                        <TouchableOpacity
                            style = {styles.settingsMenuButton}
                            onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
                            <Icon name="lock" style = {styles.settingsSecurityIcon}  size = {30} />
                            <Text style = {styles.settingsMenuTitleText}>Security</Text>
                            <Text style = {styles.settingsMenuSubtitleText}>Passcode, Encryption, Upload Security...</Text>
                            <Icon name="chevron-right" style = {styles.settingsRightArrow}  size = {30} />
                        </TouchableOpacity>

                        {/* About *
                        <TouchableOpacity
                            style = {styles.settingsMenuButton}
                            onPress = {() => this.props.navigation.navigate('SettingsScreen')} >
                            <Icon name="info" style = {styles.settingsAboutIcon}  size = {30} />
                            <Text style = {styles.settingsMenuTitleText}>About</Text>
                            <Text style = {styles.settingsMenuSubtitleText}>Application Info, Terms & Conditions...</Text>
                            <Icon name="chevron-right" style = {styles.settingsRightArrow}  size = {30} />
                        </TouchableOpacity>

                    </View> */}

                </KeyboardAwareScrollView>

                <DropdownAlert ref={ref => this.dropdown = ref} />

            </GestureRecognizer>
        );
    }
}
