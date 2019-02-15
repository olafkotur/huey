import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import styles from "../Styles";
import GalleryImage from './GalleryImage';
import FileHandler from './FileHandler';

class ImageList extends React.Component {

    state = {
        refreshing: false,
        mediaData: [],
    }

    componentDidMount = async () => {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({refreshing: true});
        Handler = new FileHandler();
        await Handler.getMedia('media').then((data) => this.setState({mediaData: data}));
        this.setState({refreshing: false});
    }

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
                    data = {this.state.mediaData}
                    extraData = {this.state}
                    horiztonal = {false}
                    numColumns = {3}
                    keyExtractor = {(item, index) => index.toString()}
                    renderItem = {({item}) => this.renderItem(item)}
                    refreshing = {this.state.refreshing}
                    onRefresh = {() => this.fetchData()} >
                </FlatList>
            </View>
        );
    }
}

export default withNavigation(ImageList);
