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
import {createUser} from "../../apis/api"
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateUser = () => {
     const [formData, setFormData] = useState({
            name: "",
            email:"",
            password:"",
            profile_picture:""

          });
      const [data, setData] = useState({});



    

    const handleLogin = async () => {
        try {
          const data = await createUser(formData);
          console.log('✅ Token:', data);
          // Aquí puedes guardar token o navegar
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
    

    //console.log(formData)

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Bienvenido</Text>
                <View>
                    <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#888"
                value={formData.name}
                onChangeText={(value) => setFormData({ ...formData, name: value })}
                />
                    <TextInput
                style={styles.input}
                placeholder="Correo"
                placeholderTextColor="#888"
                onChangeText={(value) => setFormData({ ...formData, email: value })}
                value={formData.email}
                />
                    <TextInput
                 style={styles.input}
                 placeholder="Contraseña"
                 placeholderTextColor="#888"
                 value={formData.password}
                 onChangeText={(value) => setFormData({ ...formData, password: value })}
                 secureTextEntry
                />
                
                    <TextInput
                 style={styles.input}
                 placeholder="Image perfil"
                 placeholderTextColor="#888"
                 onChangeText={(value) => setFormData({ ...formData, profile_picture: value })}
                 value={formData.profile_picture}
                 secureTextEntry
                />
            
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Crear Cuenta</Text>
                </TouchableOpacity>
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

export default CreateUser;
