import React, { useEffect, useState } from "react";
import {getCustomSongById} from "../../apis/api.js";
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
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ConciertoSong = ({ customSongId }) => {
  const [customSong, setCustomSong] = useState({});

  //custom song
  useEffect(() => {
    if (customSongId != 0) {
      const fetchSongs = async () => {
        try {
          const response = await getCustomSongById(customSongId); // Esperamos la respuesta
          setCustomSong(response); // Guardamos los datos en el estado
        } catch (error) {
          console.error("Error al obtener la customSong:", error);
        }
      };
      fetchSongs();
    }
  }, [customSongId]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10 }}>
          
          {customSong?.lyrics?.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              {/* Título del verso */}
              <Text style={styles.sectionTitle}>{section.type}</Text>

              {/* Recorremos cada línea del verso */}
              {section.lyrics?.map((line, lineIndex) => {
                const text = line?.text || "";
                const characters = text.split("");

                return (
                  <View key={lineIndex} style={styles.lineContainer}>
                    {/* Fila de acordes */}
                    <View style={styles.chordsRow}>
                      {characters.map((char, charIndex) => (
                        <TouchableOpacity
                          key={charIndex}
                          onPress={() =>
                            addChord(sectionIndex, lineIndex, charIndex)
                          }
                          style={{
                            minWidth: char === " " ? 8 : 10,
                            alignItems: "center",
                          }}
                        >
                          <Text style={styles.chord}>
                            {line.chords?.[charIndex] || " "}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    {/* Fila de letras */}
                    <View style={styles.lyricsRow}>
                      {characters.map((char, charIndex) => (
                        <TouchableOpacity
                          key={charIndex}
                          onPress={() =>
                            addChord(sectionIndex, lineIndex, charIndex)
                          }
                        >
                          <Text
                            style={char === " " ? styles.space : styles.word}
                          >
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#F5F5F5" },
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
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  lyricsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  word: {
    fontSize: 14,
    color: "black",
  },
  chord: {
    fontSize: 14,
    color: "blue",
    fontWeight: "bold",
    color: "#FF5733",
  },
  space: {
    fontSize: 10,
    color: "transparent",
    minWidth: 1,
  },
});

export default ConciertoSong;
