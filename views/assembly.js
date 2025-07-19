import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const API_KEY = '84e0209d77aa48b6a3a94bb14059c0d7'; // Tu clave de API de AssemblyAI

export default function App({ sendDataToParent }) {
    const [texto, setTexto] = useState(null)


  
    const transcribeAudio = async () => {
    try {
      // Seleccionar un archivo
      const file = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });

      if (file.type === 'cancel') {
        console.log('Selección cancelada');
        return;
      }

      console.log('Archivo seleccionado:', file.assets[0].uri);

      // Leer archivo y subirlo a AssemblyAI
      const fileData = await fetch(file.assets[0].uri);
      const fileBlob = await fileData.blob();

      const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        
        headers: {
          authorization: API_KEY,
        },
        body: fileBlob,
      });

      const uploadResult = await uploadResponse.json();
      console.log('URL del archivo subido:', uploadResult.upload_url);



      // Transcribir el archivo subido
      const transcriptionResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          authorization: API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio_url: uploadResult.upload_url,
          language_code:"es"
        }),
      });

      const transcriptionResult = await transcriptionResponse.json();
      console.log('Transcripción:', transcriptionResult);

       // Verificar el estado de la transcripción
    const checkTranscriptionStatus = async (transcriptionId) => {
        try {
          const statusResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptionId}`, {
            headers: {
              authorization: API_KEY,
            },
          });
  
          const statusData = await statusResponse.json();
          console.log('Estado de la transcripción:', statusData.status);
  
          if (statusData.status === 'completed') {
            console.log('Texto de la transcripción:', statusData.text);

            setTexto(statusData.text)
            sendDataToParent(statusData.text);  


          } else if (statusData.status === 'failed') {
            console.log('Error en la transcripción.');
          } else {
            // Si la transcripción no ha terminado, espera 5 segundos y vuelve a intentar
            setTimeout(() => checkTranscriptionStatus(transcriptionId), 5000);
          }
        } catch (error) {
          console.error('Error al verificar el estado de la transcripción:', error.message);
        }
      };
  
      // Llamar a la función para verificar el estado de la transcripción
      checkTranscriptionStatus(transcriptionResult.id);


    } catch (error) {
      console.error('Error:', error.message);
    }
  };



  return (
    <View style={styles.container}>
      <Button title="Seleccionar y Transcribir Audio" onPress={transcribeAudio} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
