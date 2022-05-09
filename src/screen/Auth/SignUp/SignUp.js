import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {useNavigation} from '@react-navigation/native';
import FacebookSvg from '../../../assets/svg/facebook.svg';
import GoggleSvg from '../../../assets/svg/goggle.svg';
import GoggleSignUpServices from '../../../services/Auth/Goggle/SignUp/SignUp';
import FacebookSignUpServices from '../../../services/Auth/Facebook/SignUp/SignUp';

const SignUp = () => {
  const cleanUpRef = useRef(false);
  const navigation = useNavigation();
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    cleanUpRef.current = true;
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '342886117655-c1i5uvjdbr6cgjqb16dg7mfllj4kp9au.apps.googleusercontent.com',
      offlineAccess: true,
    });

    return () => {
      cleanUpRef.current = false;
    }
  }, []);

  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      return auth()
        .signInWithCredential(facebookCredential)
        .then(async user => {
          console.log(user);
          const {email} = user.user;

          if (email == undefined || email == null) {
            Alert.alert(
              'Gagal Login',
              'Email anda tidak ditemukan, silahkan login dengan akun facebook',
              [
                {
                  text: 'Yahh oke deh',
                  onPress: () => {
                    console.log();
                  },
                },
              ],
              {cancelable: false},
            );
          }

          const data = {
            email: email || '',
          };

          await FacebookSignUpServices(data)
            .then(res => {
              setAuthLoading(true);

              const {status} = res;

              if (status === 'success') {
                ToastAndroid.show('Pendaftaran Berhasil', ToastAndroid.SHORT);
                navigation.navigate('Home');
              } else {
                Alert.alert(
                  'Gagal Login',
                  'Email sudah didaftarkan, silahkan daftar dengan akun facebook yang lain',
                  [
                    {
                      text: 'Oke Siap',
                      onPress: () => {
                        console.log();
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }
            })
            .catch(err => {
              Alert.alert(
                'Gagal Login',
                'Terjadi kesalahan saat login, silahkan coba lagi',
                [
                  {
                    text: 'Yahh oke deh',
                    onPress: () => {
                      console.log();
                    },
                  },
                ],
                {cancelable: false},
              );
            })
            .finally(() => {
              setAuthLoading(false);
              clearTimeout(statusTimeout);
            });
        });
    } catch (error) {
      Alert.alert('Gagal Login', error, [{text: 'OK'}], {cancelable: false});
    }
  }

  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      return auth()
        .signInWithCredential(googleCredential)
        .then(async user => {
          console.log(user);
          const {email} = user.user;

          if (email == undefined || email == null) {
            Alert.alert(
              'Gagal Login',
              'Terjadi kesalahan saat login, silahkan coba lagi',
              [
                {
                  text: 'Yahh oke deh',
                  onPress: () => {
                    console.log();
                  },
                },
              ],
              {cancelable: false},
            );
          }

          const data = {
            email: email || '',
          };

          await GoggleSignUpServices(data)
            .then(res => {
              setAuthLoading(true);

              const {status} = res;

              if (status === 'success') {
                ToastAndroid.show('Pendaftaran Berhasil', ToastAndroid.SHORT);
                navigation.replace('Home');
                
              } else {
                Alert.alert(
                  'Gagal Login',
                  'Email sudah didaftarkan, silahkan daftar dengan akun google yang lain',
                  [
                    {
                      text: 'Oke Siap',
                      onPress: () => {
                        console.log();
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }
            })
            .catch(err => {
              Alert.alert(
                'Gagal Login',
                'Terjadi kesalahan saat login, silahkan coba lagi',
                [
                  {
                    text: 'Yahh oke deh',
                    onPress: () => {
                      console.log();
                    },
                  },
                ],
                {cancelable: false},
              );
            })
            .finally(() => {
              setAuthLoading(false);
            });
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(20, 10, 38, 1)',
      }}>

      <ActivityIndicator animating={authLoading} size="large" color="#FFF" />

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}>
        <Text style={{
          fontFamily: 'Raleway-ExtraBoldItalic',
          fontSize: 40,
          color: 'rgba(255, 255, 255, 0.9)',
          textAlign: 'center',
          marginVertical: 30,
        }}>Mau daftar lewat mana ?</Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
            height: 50,
            backgroundColor: '#3B5798',
            position: 'relative',
            borderRadius: 5,
            marginVertical: 10,
          }}
          onPress={() => onFacebookButtonPress()}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              backgroundColor: '#283B68',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 15,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}>
            <FacebookSvg width={20} height={20} fill={'#FFF'} />
          </View>
          <Text
            style={{
              fontFamily: 'Raleway-Regular',
              fontSize: 14,
              color: '#fff',
            }}>
            Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
            height: 50,
            backgroundColor: 'rgba(201, 79, 71, 0.8)',
            position: 'relative',
            borderRadius: 5,
            marginVertical: 10,
          }}
          onPress={onGoogleButtonPress}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              backgroundColor: '#c94f47',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 15,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            }}>
            <GoggleSvg width={20} height={20} fill={'#FFF'} />
          </View>
          <Text
            style={{
              fontFamily: 'Raleway-Regular',
              fontSize: 14,
              color: '#fff',
            }}>
            Goggle
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              borderRadius: 5,
              marginVertical: 30
            }}
            onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontFamily: 'Raleway-Regular',
                fontSize: 14,
                color: '#fff',
              }}>
              Sudah punya akun ? Silahkan masuk
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
