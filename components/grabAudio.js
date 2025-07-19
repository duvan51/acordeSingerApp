import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import { Audio } from "expo-av";

const GrabAudio = () => {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [audioUri, setAudioUri] = useState(null);




  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        alert("Permiso de grabación no concedido");
        return;
      }
  
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
  
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
  
      setRecording(newRecording);
    } catch (error) {
      console.error("Error al iniciar la grabación:", error);
    }
  };
  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);
    } catch (error) {
      console.error("Error al detener la grabación:", error);
    }
  };
  const playRecording = async () => {
    try {
      if (audioUri) {
        const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
        setSound(sound);
        await sound.playAsync();
      }
    } catch (error) {
      console.error("Error al reproducir el audio:", error);
    }
  };


  
  
  return (
    <View>
      <Button
      title={recording ? "Detener Grabación" : "Iniciar Grabación"}
      onPress={recording ? stopRecording : startRecording}
      />
      {audioUri && (
      <Button title="Reproducir Grabación" onPress={playRecording} />
      )}
      {audioUri && <Text>Audio guardado en: {audioUri}</Text>}
  </View>
  )
}

export default GrabAudio