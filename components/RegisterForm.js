import React, {useContext} from 'react';
import FormTextInput from './FormTextInput.js';
import {Alert, View, Button} from 'react-native';
import { useLogin, useRegister } from '../hooks/ApiHooks';
import useSignUpForm from '../hooks/RegisterHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterForm = () => {
  const {setUser, isLoggedIn, user, setIsLoggedIn} = useContext(MainContext);

  const doRegister = async () => {
    const serverResponse = await useRegister(inputs);
    if (serverResponse) {
      Alert.alert(serverResponse.message);
      const loginServerResponse = await useLogin(inputs);
      if (loginServerResponse) {
        Alert.alert(loginServerResponse.message);
        await AsyncStorage.setItem('userToken', loginServerResponse.token);
        setUser(loginServerResponse.user);
        console.log("user is: ",user);
        setIsLoggedIn(true);
      } else {
        Alert.alert('Login failed');
      }
    } else {
      Alert.alert('register failed');
    }
};

const {inputs, handleInputChange} = useSignUpForm();

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
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
      />
      <Button title="Register!" onPress={doRegister}/>
    </View>
    );
}

export default RegisterForm;