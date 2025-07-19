import React,{useState} from "react";
import { StyleSheet, TextInput,ScrollView, View, Text} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Assembly from "../assembly.js";
import GrabAudio from "../../components/grabAudio.js";


const CreateSong = () => {
  const [texts, setTexts] =useState('')
  const [number, onChangeNumber] = React.useState("");
  const [assemblyData, setAssemblyData] = useState(''); 
  
  const handleAssemblyData = (data) => {
    setAssemblyData(data);  
  };
  const onChangeText = (text) => {
    setAssemblyData(text); 
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaProvider >
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder="Titulo de cancion"
            value={texts.title}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder="Autor"
            value={texts.autor}
          />
          <SafeAreaView style={[styles.containerText]}>
            <View >
               <Assembly 
                sendDataToParent={handleAssemblyData}
               />
               <GrabAudio />
            </View>
            <TextInput
              editable
              multiline
              numberOfLines={10}
              onChangeText={onChangeText}
              value={assemblyData}
              style={styles.textInput}
            />
          </SafeAreaView>
        </SafeAreaView>
      </SafeAreaProvider>


    </ScrollView>
  );
};





const styles = StyleSheet.create({
  container:{
    backgroundColor: "white",
    flex:1
  },
  containerText: {
    borderBottomColor: "#000",
    borderWidth: 1,
    margin: 12,
    borderRadius: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  
  textInput: {
    padding: 10,
  },
});

export default CreateSong;
