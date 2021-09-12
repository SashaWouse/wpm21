import React from 'react';
import PropTypes from 'prop-types';
// import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {Avatar, ListItem as RNEListItem} from 'react-native-elements';


const ListItem = ({singleMedia, navigation}) => {
    console.log('singleMedia', singleMedia);
    return (
        <RNEListItem
            bottomDivider
            onPress={() => {
                navigation.navigate('Single', singleMedia);
            }}
            >
            <Avatar
                size="large"
                square
                source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
            ></Avatar>
            <RNEListItem.Content>
                <RNEListItem.Title h4>{singleMedia.title}</RNEListItem.Title>
                <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>
            </RNEListItem.Content>
            <RNEListItem.Chevron />
    </RNEListItem>
    );
};

// const styles = StyleSheet.create({
// row: {
//     flexDirection: 'row',
//     padding: 15,
//     marginBottom: 5,
//     backgroundColor: '#eee',
//     borderRadius: 6,
//     flex: 1,
// },
// imagebox: {
//     flex: 1,
// },
// image: {
//     flex: 1,
//     borderRadius: 6,
// },
// textbox: {
//     flex: 2,
//     padding: 10,
// },
// listTitle: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     paddingBottom: 15,
//     },
// });

ListItem.propTypes = {
    singleMedia: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};

export default ListItem;