import React, { useEffect, useState } from "react";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { TouchableOpacity, View, Text, Alert, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loginGoogle} from "../../apis/api"
import { useNavigation } from '@react-navigation/native'
import LogoGoogle from "../../assets/images/logoGoogle.png"
import Constants from "expo-constants";


WebBrowser.maybeCompleteAuthSession();

const Login = () => {
    const navigation = useNavigation();
  const [accesToken, setAccesToken] = useState(null);
  const [user, setUser] = useState(null);
 
  const isExpoGo = Constants.appOwnership === "expo";

const [request, response, promptAsync] = Google.useAuthRequest({
  androidClientId: "316106480930-nc3qqgkh6o8vd1b9ch3pqq9750lo7rfd.apps.googleusercontent.com",
  expoClientId: "316106480930-cib0p16f3dc3tsrft0e98p28timv1st5.apps.googleusercontent.com",
  webClientId: "316106480930-cib0p16f3dc3tsrft0e98p28timv1st5.apps.googleusercontent.com",
  scopes: ["openid", "profile", "email"],
  useProxy: isExpoGo,
  redirectUri: AuthSession.makeRedirectUri({
    native: "acordeSingerApp://redirect", // Este debe coincidir con "scheme" en app.json
  }),
});




 // console.log("isExpoGo:", isExpoGo);
//console.log("redirect URI:", AuthSession.makeRedirectUri({native: "acordeSingerApp://redirect"}));

  

  useEffect(() => {
  const checkGoogleLogin = async () => {
    const localUser = await getLocalUSer();

    if (localUser) {
      setUser(localUser);
      return;
    }

    if (response?.type === "success" && response?.authentication?.accessToken) {
      await getUSerInfo(response.authentication.accessToken);
    }
  };

  checkGoogleLogin();
}, [response]);





  const getLocalUSer = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };
  const getUSerInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUser(user);

      console.log(user)
        const data = await loginGoogle(user.email, user.name, user.id, user.picture);

        await AsyncStorage.setItem("@userToken", data.access_token);
        await AsyncStorage.setItem("@userId", data.user.id.toString())

        navigation.reset({
            index: 0,
            routes: [{ name: "MainTabs" }],
        });

    } catch (error) {
        console.error("Error en login con Google:", error);
    }
  };




  const logout = async () => {
  try {
    // Borrar todo lo relacionado al usuario
    await AsyncStorage.removeItem('@userToken');
    await AsyncStorage.removeItem('@userId');
    await AsyncStorage.removeItem('@user');

    // Opcional: limpiar todo si no tienes más info guardada
    // await AsyncStorage.clear();

    // Navegar a pantalla de login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });

    Alert.alert('Sesión cerrada correctamente');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    Alert.alert('Error', 'No se pudo cerrar la sesión.');
  }
};




  return (
    <View>
      {!user ? (
        <TouchableOpacity
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
          style={styles.button}
        > 
          <View style={{
            width:"20%", 
            backgroundColor:"#ffff",
            height:"100%",
            alignItems: 'center',
          }}>
            <Image source={LogoGoogle} style={{ width: 40, height: 40 }} />
          </View>
          <View style={{
            width:"80%",  
            alignItems: 'center',
            color:"#ffff",
            
          
          }}>
            <Text style={styles.buttonText}>Iniciar Sesion Con Google</Text>
          </View>   
        </TouchableOpacity>
      ) : (
        <>
        <View>
          <Text>{user.email}</Text>
        </View>


        <TouchableOpacity
          disabled={!request}
          onPress={logout}
          
        >
          <Text>Cerrar sesion</Text>
        </TouchableOpacity>


        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({

   button: {
        backgroundColor: '#007AFF',
        paddingHorizontal:12,
        paddingVertical:4,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 10,
        flexDirection:"row",
        height:50
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})

export default Login;
