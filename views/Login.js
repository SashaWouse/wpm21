import React, {useContext, useEffect} from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {ImageBackground} from 'react-native';
import {Card} from 'react-native-elements';

    const Login = ({navigation}) => {
        const {setIsLoggedIn, setUser} = useContext(MainContext);
        const {checkToken} = useUser();
        //const[registerFormToggle, setRegisterFormToggle] = useState(false);

    const getToken = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log('logIn asyncstorage token', userToken);

    if (userToken) {
        const userInfo = await checkToken(userToken);
            if (userInfo.user_id) {
                setUser(userInfo);
                setIsLoggedIn(true);
            }
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.container}
        >
            <ImageBackground
                source={require('../assets/splash.png')}
                style={styles.image}
            >
            <Card>
                <Card.Title h4>Login</Card.Title>
                <LoginForm navigation={navigation} />
                    <Card.Divider />
                <Card.Title h4>Register</Card.Title>
                    <RegisterForm navigation={navigation} />
                </Card>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    },
});

    Login.propTypes = {
        navigation: PropTypes.object,
    };

export default Login;