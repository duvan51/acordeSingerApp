import React, { useEffect, useState } from "react";
import { getSongById } from "../../apis/api.js";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  PermissionsAndroid,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome from 'react-native-vector-icons/FontAwesome';







const SongViewId = ({ navigation }) => {
  const [data, setData] = useState({});
  const route = useRoute();
  const { songId } = route.params || {};

  if (!songId) {
    return <Text>No se encontró la canción</Text>;
  }

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await getSongById(songId); // Esperamos la respuesta
        setData(songs); // Guardamos los datos en el estado
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    };

    fetchSongs();
  }, [songId]);

  const editSong = (song) => {
    navigation.navigate("SongView", { songId: song.id });
  };


  //console.log(data)


  return (
    <View style={styles.container}>
         <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{ 
              width:"100%", 
              flexDirection:"row", 
              borderBottomWidth:1, 
              borderBottomColor: "rgb(216, 216, 216);", 
              paddingBottom:6,
              height:60,
              alignItems: "center",
              }}> 
             <TouchableOpacity onPress={() => navigation.goBack()} 
                style={{ 
                  width: "10%", 
                  height: "100%", 
                  justifyContent: "center", 
                  alignItems: "center"
                }}>
                <FontAwesome name="arrow-left" size={30} color="black" />
             </TouchableOpacity>
             <View 
              style={{ 
                width:"70%",  
                height:"100%",
                justifyContent: "center", 
                alignItems: "center",
                flexDirection:"row",
                flexWrap: "wrap"
              }}>
              {data?.categories?.map((x)=>(
                <View key={x.id}
                  style={{
                    width:"auto",
                    marginHorizontal:2
                  }}
                >
                  <Text
                    style={{
                      color: "rgb(150, 146, 146);",
                      fontSize:13,
                    }}
                  >
                    {x.name}
                  </Text>
                </View>
              ))}
             </View>
             <View style={{ 
                width:"20%",  
                height: "100%", 
                justifyContent: "center", 
                alignItems: "center"
              }}>
                <View>
                  <FontAwesome name="plus" size={15} color="black" />
                </View>
                <View>
                  <FontAwesome name="minus" size={15} color="black" />
                </View>
             </View>
          </View>

        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.artist}>{data.autor}</Text>

     
                {data?.song?.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{section.type}</Text>
        
            {section.lyrics.map((line, lineIndex) => {
              const characters = line.text.split(""); // Separa todo, incluyendo espacios
              return (
                <View key={lineIndex} style={styles.lineContainer}>
                  {/* Línea de acordes (alineada con caracteres, incluyendo espacios) */}
                  <View style={styles.chordsRow}>
                    {characters.map((char, charIndex) => (
                      <TouchableOpacity
                        key={charIndex}
                        onPress={() => addChord(sectionIndex, lineIndex, charIndex)}
                        style={{
                          minWidth: char === " " ? 8 : 10, // Espacios más pequeños para mejor alineación
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.chord}>
                          {line.chords?.[charIndex] || " "}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
        
                  {/* Línea de texto (incluyendo espacios) */}
                  <View style={styles.lyricsRow}>
                    {characters.map((char, charIndex) => (
                      <TouchableOpacity
                        key={charIndex}
                        onPress={() => addChord(sectionIndex, lineIndex, charIndex)}
                      >
                        <Text style={char === " " ? styles.space : styles.word}>
                          {char}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        ))}


        <View>
          <Icon
            name="edit"
            size={40}
            color="black"
            onPress={() => editSong(data)}
          />
        </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F5F5F5" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  artist: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionContainer: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 10,
  },
  lineContainer: { marginBottom: 5 },
  chordsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
  lyricsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },

  sectionContainer: { marginBottom: 20 },
sectionTitle: { fontWeight: "bold", fontSize: 16 },
lineContainer: { marginBottom: 10 },
  chordsRow: {
    flexDirection: "row", justifyContent: "flex-start"
  },
  lyricsRow: {
    flexDirection: "row", justifyContent: "flex-start" 
  },
  word: {
    fontSize: 14, color: "black", 
  },
  chord: {
    fontSize: 14, color: "blue", fontWeight: "bold", color: "#FF5733",
  },
  space: {
    fontSize: 10, color: "transparent", minWidth: 1 
  },
});

export default SongViewId;
