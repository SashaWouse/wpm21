import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, ActivityIndicator} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, ListItem} from 'react-native-elements';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {ScrollView} from 'react-native-gesture-handler';

    const Profile = (props) => {
        const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);
        const [avatar, setAvatar] = useState('https://placekitten.com/400/400');
        // console.log('Profile isLoggedIn', isLoggedIn);
        // console.log('user on profile page', user);
    
        const {getFilesByTag} = useTag();

        useEffect(() => {
            (async () => {
            const file = await getFilesByTag('avatar_' + user.user_id);
            console.log('file', file);
            setAvatar(uploadsUrl + file.pop().filename);
            })();
        }, [user]);
    
        const logout = async () => {
            await AsyncStorage.clear();
            setIsLoggedIn(false);
            if (!isLoggedIn) {
                props.navigation.navigate('Login');
            }
        };
        return (
            <ScrollView>
                <Card>
                    <Card.Title>
                        <Text h1>{user.username}</Text>
                    </Card.Title>
                <Card.Image
                    source={{uri: avatar}}
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <ListItem>
                    <Avatar icon={{name: 'email', color: 'black'}} />
                    <Text>{user.email}</Text>
                </ListItem>
                <ListItem>
                    <Avatar icon={{name: 'user', type: 'font-awesome', color: 'black'}} />
                    <Text>{user.full_name}</Text>
                </ListItem>
                <ListItem bottomDivider onPress={logout}>
                    <Avatar icon={{name: 'logout', color: 'black'}} />
                    <ListItem.Content>
                    <ListItem.Title>Logout</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </Card>
        </ScrollView> 
        );
    };

    const styles = StyleSheet.create({
        image: {width: '100%', height: undefined, aspectRatio: 1},
    });

    Profile.propTypes = {
        navigation: PropTypes.object,
    };

    export default Profile;