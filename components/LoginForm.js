import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput.js';
import {Alert, Button, View} from 'react-native';
// import {Button, Input} from 'react-native-elements';
import { useLogin } from '../hooks/ApiHooks';
import useLoginForm from '../hooks/LoginHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = ({navigation}) => {
  const {setUser, setIsLoggedIn} = useContext(MainContext);
  const {inputs, handleInputChange} = useLoginForm();
  const {login} = useLogin();

    const doLogin = async () => {
      try {
        const serverResponse = await useLogin(inputs);
        Alert.alert(serverResponse.message);
        await AsyncStorage.setItem('userToken', serverResponse.token);
        setUser(serverResponse.user);
        setIsLoggedIn(true);
      } catch (error) {
        Alert.alert('Login failed');
      }
  };

  // const {inputs, handleInputChange} = useLoginForm(); 

    return (
        <View>
          <FormTextInput
            autoCapitalize="none"
            placeholder="username"
            onChangeText={(txt) => handleInputChange('username', txt)}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="password"
            onChangeText={(txt) => handleInputChange('password', txt)}
            secureTextEntry={true}
          />
      <Button raised title="Login!" onPress={doLogin}/>
    </View>
    );
};

LoginForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginForm;