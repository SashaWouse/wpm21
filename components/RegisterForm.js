import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput.js';
import {Alert, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useLogin, useRegister} from '../hooks/ApiHooks';
import useSignUpForm from '../hooks/RegisterHooks';
import {MainContext} from '../contexts/MainContext';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterForm = ({navigation}) => {
  const {inputs, handleInputChange} = useSignUpForm();
  const {register} = useUser();

  const doRegister = async () => {
    try {
      const registerInfo = await register(inputs);
      if (registerInfo) {
        Alert.alert(registerInfo.message);
      }
    } catch (e) {
      Alert.alert('register failed', e.message);
    }
};

    return (
        <View>
          <FormTextInput
            autoCapitalize="none"
            placeholder="username"
            onChangeText={(txt) => handleInputChange('username', txt)}
            onEditing={(event) => {}}
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
};

RegisterForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegisterForm;