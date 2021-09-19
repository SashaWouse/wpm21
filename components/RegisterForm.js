import React from 'react';
import PropTypes from 'prop-types';
import FormTextInput from './FormTextInput.js';
import {Alert, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useUser} from '../hooks/ApiHooks';
import useSignUpForm from '../hooks/RegisterHooks';
import {MainContext} from '../contexts/MainContext';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterForm = ({navigation}) => {
  const {inputs, errors, handleInputChange, handleOnEndEditing, checkUsername} = useSignUpForm();
  const {register} = useUser();

  const doRegister = async () => {
    try {
      delete inputs.confirmPassword;
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
            onEndEditing={(event) => {
              console.log('onEndEditing value', event.nativeEvent.text);
              checkUsername(event.nativeEvent.text);
              handleOnEndEditing('username', event.nativeEvent.text);
            }}
            errorMessage={errors.username}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="password"
            onChangeText={(txt) => handleInputChange('password', txt)}
            secureTextEntry={true}
            onEndEditing={(event) => {
              handleOnEndEditing('password', event.nativeEvent.text);
          }}
          errorMessage={errors.password}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="confirm password"
            onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
            secureTextEntry={true}
            onEndEditing={(event) => {
              handleOnEndEditing('confirmPassword', event.nativeEvent.text);
            }}
            errorMessage={errors.confirmPassword}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="email"
            onChangeText={(txt) => handleInputChange('email', txt)}
            onEndEditing={(event) => {
              handleOnEndEditing('email', event.nativeEvent.text);
            }}
            errorMessage={errors.email}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="full name"
            onChangeText={(txt) => handleInputChange('full_name', txt)}
            onEndEditing={(event) => {
              handleOnEndEditing('full_name', event.nativeEvent.text);
            }}
            errorMessage={errors.full_name}
          />
          <Button title="Register!" 
                  onPress={doRegister} 
                  disabled={errors.username || errors.password || errors.email}
              />
      </View>
    );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default RegisterForm;