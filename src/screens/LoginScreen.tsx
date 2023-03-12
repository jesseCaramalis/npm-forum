import React, { useState, useLayoutEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LoginScreenProps } from '../../types/navigation';
import * as SecureStore from 'expo-secure-store';
import { postLogin } from '../api/postLogin';


const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const handleLogin = async () => {
    try {
      const data = await postLogin(email, password)
      const { accessToken } = data;
      await SecureStore.setItemAsync('jwt', accessToken);
      navigation.replace('Feed');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/login-bg.png')} />
      <View style={styles.intro}>
        <Text style={styles.title}>Welcome to {'\n'}the NBM Forum</Text>
        <Text style={styles.subtitle}>Time to get all the answers you need in a forum made for designers and developers!</Text>
        <View style={styles.form}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Jump In!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  intro: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 25,
    fontFamily: 'Syne-SemiBold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Syne-Regular',
  },
  form: {
    marginTop: 20,
    width: '100%',
    height: '25%',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#6537FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Syne-Regular',
  },
  image: {
    width: '100%',
    flex: 1,
  }
});

export default LoginScreen;
