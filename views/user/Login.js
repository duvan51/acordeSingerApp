import React, { useEffect, useState } from 'react';
import { 
    TouchableOpacity, 
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    Alert
} from 'react-native';
import { 
    SafeAreaProvider, 
    SafeAreaView 
} from 'react-native-safe-area-context';
import {login} from "../../apis/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

import LoginGoogle from "../user/LoginGoogle.js";



const Login = () => {
     const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    

    const handleLogin = async () => {
        try {
          const data = await login(email, password);
          console.log('✅ Token:', data.access_token);
          Alert.alert('Bienvenido');

          await AsyncStorage.setItem('@userToken', data.access_token);
          await AsyncStorage.setItem('@userId', data.user.id.toString());

          navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
          });
          
        } catch (error) {
          console.error(error.response?.data || error.message);
          Alert.alert('Error', 'Credenciales incorrectas');
        }
    };



    useEffect(() => {
        const getToken = async () => {
          const token = await AsyncStorage.getItem('@userToken');
          console.log("✅ Este es el token =>", token);
        };
      
        getToken();
    }, []);
    


    

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Bienvenido</Text>
                <View>
                    <TextInput
                style={styles.input}
                placeholder="Correo"
                onChangeText={setEmail}
                value={email}
            />
                    <TextInput
                 style={styles.input}
                 placeholder="Contraseña"
                 onChangeText={setPassword}
                 value={password}
                 secureTextEntry
            />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <LoginGoogle />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 12,
        borderRadius: 6,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Login;
