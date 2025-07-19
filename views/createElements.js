import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { openAi } from "../apis/openAi.js";
import axios from "axios";

import { API_KEY_whisperEndpoint } from '@env'; // Asegúrate de tener configurado dotenv para acceder a las variables de entorno


const apiKey = API_KEY_whisperEndpoint; // Tu clave de OpenAI
const whisperEndpoint = 'https://api.openai.com/v1/audio/transcriptions';




const CreateElements = ({ navigation })=> {
    
    const respuesta = async()=>{
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: 'audio/*', // Permitir archivos de audio
            })
            if (res.type === 'cancel') {
                console.log('Selección de archivo cancelada.');
                return;
            }
           // console.log('Archivo seleccionado:', res.assets[0].uri);

             // Paso 2: Crear FormData para la API de OpenAI
            const formData = new FormData();
            formData.append('file', {
                uri: res.assets[0].uri, // URI del archivo seleccionado
                type: 'audio/mpeg', // Ajusta según el tipo del archivo
                name: 'audio.mp3', // Nombre del archivo
            });
            formData.append('model', 'whisper-1'); // Modelo de OpenAI

            // Paso 3: Llamar a la función de OpenAI
            //const response = await openAi(formData);
            const response = await axios.post(whisperEndpoint, formData, {
                headers: {
                  Authorization: `Bearer ${apiKey}`, // Tu clave de OpenAI
                  "Content-Type": "multipart/form-data",
                },
              });

            // Paso 4: Mostrar la respuesta en consola
            console.log('Transcripción obtenida:', response);

        } catch (error) {
            console.log("error al enviar los datos", error)
        }
    }

    
    return (
    <View style={styles.container}>
      <Button
        title="Seleccionar y Transcribir Audio"
        onPress={respuesta} // Llama a la función al presionar el botón
      />
    </View>
  );
};
export default CreateElements;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});