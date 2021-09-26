import React, {useContext} from 'react';
import PropTypes from 'prop-types';
// import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Button, ListItem as RNEListItem} from 'react-native-elements';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const ListItem = ({singleMedia, navigation, showButtons}) => {
    //console.log('singleMedia', singleMedia);
    const {update, setUpdate} = useContext(MainContext);
    const {deleteMedia} = useMedia();

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
                source={{uri: uploadsUrl + singleMedia.thumbnails?.w160}}
            ></Avatar>
            <RNEListItem.Content>
                <RNEListItem.Title h4>{singleMedia.title}</RNEListItem.Title>
                <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>
                {showButtons && (
                    <>
                        <Button
                        title="Modify"
                        onPress={() => {
                            navigation.navigate('Modify', {singleMedia, navigation});
                        }}
                        />
                        <Button
                        title="Delete"
                        onPress={async () => {
                            try {
                            const token = await AsyncStorage.getItem('userToken');
                            const response = await deleteMedia(
                                singleMedia.file_id,
                                token
                            );
                            console.log('Delete', response);
                            if (response.message) {
                                setUpdate(update + 1);
                            }
                            } catch (e) {
                            console.log('ListItem, delete: ', e.message);
                            }
                        }}
                        />
                    </>
                )}
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
    showButtons: PropTypes.bool.isRequired,
};

export default ListItem;