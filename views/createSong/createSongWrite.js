import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Text,
  Button,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Assembly from "../assembly.js";
import GrabAudio from "../../components/grabAudio.js";

import { createSong } from "../../apis/api.js";

const CreateSongWrite = () => {
  const [texts, setTexts] = useState("");
  const [songComplet, setSongComplet] = useState([]);
  const [assemblyData, setAssemblyData] = useState("");

  const [text, setText] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    autor: "",
    song: songComplet,
  });
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };



  
const regex = /^(Verso \d+|Coro|Puente|Intro|Outro)/gm;

const handleSong = (text) => {
  setTexts(text);
  setText(text);

  const lines = text.split("\n").map(line => line.trim()).filter(line => line !== "");
  
  let structuredSong = [];
  let currentSection = null;

  lines.forEach((line) => {
    if (regex.test(line)) {
      // Si la línea coincide con un título (ej. "Verso 1", "Coro"), se inicia una nueva sección
      currentSection = {
        type: line,
        lyrics: [],
      };
      structuredSong.push(currentSection);
    } else if (currentSection) {
      // Si no es título, se agrega a la sección actual
      currentSection.lyrics.push({
        text: line,
        chords: [],
      });
    }
  });

  setSongComplet(structuredSong);
};






  useEffect(() => {
    setFormData((prev) => ({ ...prev, song: songComplet }));
  }, [songComplet]);

  const GurdarSong = async () => {
    try {
      const response = createSong(formData);
      console.log("respuesta gurdada=> ", response.data);
    } catch (error) {
      console.log("error en la peticion", error);
    }
  };


  //console.log(formData);

//add text de boton
const addText = (newText) => {
  setTexts((prevText) => {
    const updatedText = prevText + `\n${newText}`; // Agrega el nuevo texto
    handleSong(updatedText); // Procesa el nuevo texto
    return updatedText; // Retorna el nuevo estado
  });
};







  return (
    <ScrollView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange("name", text)}
            placeholder="Titulo de cancion"
            value={formData.name}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange("autor", text)}
            placeholder="Autor"
            value={formData.autor}
          />
          <SafeAreaView style={[styles.containerText]}>
            <View style={styles.buttonAdd}>
              <Button title="Agregar Verso" onPress={() => addText("Verso: ")} />
              <Button title="Agregar Coro" onPress={() => addText("Coro: ")} />
              <Button title="Agregar Puente" onPress={() => addText("Puente: ")} />
            </View>
            <TextInput
              editable
              multiline={true}
              numberOfLines={10}
              onChangeText={handleSong}
              value={texts}
              style={styles.textInput}
            />
            
          </SafeAreaView>
        </SafeAreaView>
        <View style={{ marginTop: 20, width: "100%" }}>
          <Button
            title="Gurdar Cancion"
            onPress={GurdarSong}
            style={{ width: "100%" }}
          />
        </View>
      </SafeAreaProvider>
      <View>
        <View>
          <Text>{formData.name}</Text>
        </View>
        <View>
          <Text>{formData.autor}</Text>
        </View>
        <View>



          <View style={{ flex:1, gap:10 }}>
            {formData.song?.map((x, index) => (
             
                <View key={index} style={styles.sectionSong} >
                  {/* Línea de acordes */}
                  
                  <View >
                    <View>
                      <Text style={styles.sectionTitle}>
                        {x.type}
                      </Text>
                    </View>
                    
                    <View>
                      {x.lyrics?.map((y, i)=>(
                        console.log(y.text),
                        <View key={i}>
                          <Text style={styles.word}>
                            {y.text}
                          </Text>
                        </View>
                      ))}
                    </View>
                    
                  </View>
                </View>
        
            ))}
          </View>


        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 12,
  },
  containerText: {
    borderBottomColor: "#000",
    borderWidth: 1,
    marginVertical: 12,
    borderRadius: 10,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },

  textInput: {
    padding: 10,
  },





  sectionSong: {
    flex: 1,
    marginTop:5
   
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 10,
  },
  word: {
    fontSize: 14,
    color: "#333",
    marginHorizontal: 2,
  },




  buttonAdd:{
    flex:1,
    flexDirection:"row"
  }
});

export default CreateSongWrite;
