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
import GoggleSignInServices from '../../../services/Auth/Goggle/SignIn/SignIn';
import FacebookSignInServices from '../../../services/Auth/Facebook/SignIn/SignIn';
const {width} = Dimensions.get('window');

const words = [
  'Joggo note adalah aplikasi catatan yang sangat mudah digunakan untuk menyimpan catatan-catatan yang penting dan pentingnya.',
  'Semua catatan yang anda buat tersimpan aman dalam database kami',
  'Sangat cepat dan efektif karena dibuat dengan seorang developer professional',
];

const Login = () => {
  const scrollValue = useRef(new Animated.Value(0)).current;
  const cleanUpRef = useRef(false);
  const navigation = useNavigation();
  const [authLoading, setAuthLoading] = useState(false);
  const translateX = scrollValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, 20],
  });

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
    };
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
                  text: 'OK',
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

          await FacebookSignInServices(data)
            .then(res => {
              setAuthLoading(true);

              console.log(res);

              const {status} = res;

              if (status === 'success') {
                // ToastAndroid.show('Login Berhasil', ToastAndroid.SHORT);
                navigation.replace('Home');
              } else {
                Alert.alert(
                  'Gagal Login',
                  'Email anda belum terdaftar, apakah anda ingin mendaftar?',
                  [
                    {
                      text: 'Nanti Saja',
                      onPress: () => {
                        console.log();
                      },
                      style: 'cancel',
                    },
                    {
                      text: 'Ya, Ingin mendaftar',
                      onPress: () => {
                        navigation.navigate('SignUp');
                      },
                      style: 'destructive',
                    },
                  ],
                );
              }
            })
            .catch(err => {
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
            })
            .finally(() => {
              setAuthLoading(false);
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
                  text: 'OK',
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

          await GoggleSignInServices(data)
            .then(res => {
              setAuthLoading(true);

              console.log(res);

              const {status} = res;

              if (status === 'success') {
                ToastAndroid.show('Login Berhasil', ToastAndroid.SHORT);
                navigation.navigate('Home');
              } else {
                Alert.alert(
                  'Gagal Login',
                  'Email anda belum terdaftar, apakah anda ingin mendaftar?',
                  [
                    {
                      text: 'Nanti Saja',
                      onPress: () => {
                        console.log();
                      },
                      style: 'cancel',
                    },
                    {
                      text: 'Ya, Ingin mendaftar',
                      onPress: () => {
                        navigation.navigate('SignUp');
                      },
                      style: 'destructive',
                    },
                  ],
                );
              }
            })
            .catch(err => {
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

  function Indicator() {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: '#00000044',
          marginHorizontal: 5,
        }}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(20, 10, 38, 1)',
      }}>
      <ScrollView>
        <Image
          style={{
            height: 300,
            position: 'relative',
            width: '100%',
            borderBottomRightRadius: 150,
            borderBottomLeftRadius: 150,
          }}
          source={require('../../../assets/img/rectangle.png')}
        />

        <ActivityIndicator animating={authLoading} size="large" color="#fff" />
        <View
          style={{
            position: 'absolute',
            top: 100,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Raleway-Regular',
              fontSize: 14,
              color: '#FFF',
            }}>
            Hai, Selamat Datang Di
          </Text>
          <Text
            style={{
              fontFamily: 'Raleway-ExtraBold',
              fontSize: 40,
              color: '#FFF',
            }}>
            Joggo Note
          </Text>
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollValue}}}],
            {useNativeDriver: false},
          )}
          style={{
            marginTop: 70,
          }}>
          {words.map(x => (
            <View
              style={[
                {
                  width: width - 10,
                  height: 100,
                  marginHorizontal: 5,
                  borderRadius: 5,
                  backgroundColor: 'rgba(20, 10, 38, 1)',
                  alignItems: 'center',
                },
              ]}
              key={x}>
              <Text
                style={{
                  fontFamily: 'Raleway-Regular',
                  fontSize: 14,
                  textAlign: 'center',
                  color: 'rgba(173, 173, 173, 1)',
                }}>
                {x}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            marginTop: 20,
          }}
          pointerEvents="none">
          {words.map(x => (
            <Indicator x={x} key={x} />
          ))}
          <Animated.View
            style={[
              {
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: '#fff',
                marginHorizontal: 5,
              },
              {position: 'absolute', transform: [{translateX}]},
            ]}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 100,
            width: '100%',
          }}>
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
            onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={{
                fontFamily: 'Raleway-Regular',
                fontSize: 14,
                color: '#fff',
              }}>
              Belum punya akun ? Silahkan lakukan registrasi
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

// <View>
//   <GoogleSigninButton
//     style={{width: 192, height: 48}}
//     size={GoogleSigninButton.Size.Wide}
//     color={GoogleSigninButton.Color.Dark}
//     onPress={onGoogleButtonPress}
//   />
//   <Button
//     title="Facebook Sign-In"
//     onPress={() =>
//       onFacebookButtonPress().then(() =>
//         console.log('Signed in with Facebook!'),
//       )
//     }
//   />
// </View>
