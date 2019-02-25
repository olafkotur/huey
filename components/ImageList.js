import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from "../Styles";
import GalleryImage from './GalleryImage';
import FileHandler from './FileHandler';

class ImageList extends React.Component {

    renderItem = (item) => {
        const fileName = item.url.split('media%2F').pop().split('?')[0];
        const fileType = fileName.includes('.png') ? 'photo' : 'video';

        return (
            <TouchableOpacity
                onPress = {() => this.props.navigation.navigate('FocusedImage', {uri: item.url, fileType: fileType})} >
                <GalleryImage uri = {item.url} fileType = {fileType} />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style = {styles.galleryTabViewContainer}>				
                  <FlatList
                    data = {this.props.data}
                    extraData = {this.state}
                    horiztonal = {false}
                    numColumns = {3}
                    keyExtractor = {(item, index) => index.toString()}
                    renderItem = {({item}) => this.renderItem(item)}>
                </FlatList>
            </View>
        );
    }
}

export default withNavigation(ImageList);
