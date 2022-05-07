import React from 'react';
import Splash from '../../screen/Splash/Splash';
import Login from '../../screen/Auth/Login/Login';
import SignUp from '../../screen/Auth/SignUp/SignUp';
import Home from '../../screen/Home/Home/Home';
import AnimatableExtra from '../../../testing';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, Text, ToastAndroid, Alert} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {

      await GoogleSignin.isSignedIn()
        .then(async isSignedIn => {
          if (isSignedIn) {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
          }
        })
        .catch(error => {
          console.log(error);
        }
      );

      await AccessToken.getCurrentAccessToken()
      .then(async data => {
        if (data) {
          await LoginManager.logOut();
        }
      }
      )
      await AsyncStorage.clear();
      ToastAndroid.show('Logout Berhasil', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert(
        'Gagal Login',
        'Terjadi kesalahan saat login, silahkan coba lagi',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log();
            },
          },
        ],
        {cancelable: false},
      );
    }
  };
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen 
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="AnimatableExtra" component={AnimatableExtra} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: 'rgba(20, 10, 38, 1)',
          },
          headerTitle: 'Joggo Note',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'Raleway-ExtraBoldItalic',
          },
          headerBackVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                marginVertical: 10,
                borderRadius: 5,
              }}
              onPressOut={() => handleLogout()}>
              <Icon
                name="logout-variant"
                size={23}
                color="rgba(255, 255, 255, 1)"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
