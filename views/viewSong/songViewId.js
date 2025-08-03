import React, { useEffect, useState } from "react";
import { getSongById } from "../../apis/api.js";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SongViewId = ({ navigation }) => {
  const [data, setData] = useState({});
  const [zoom, setZoom] = useState(1);
  const route = useRoute();
  const { songId } = route.params || {};

  if (!songId) return <Text>No se encontró la canción</Text>;

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await getSongById(songId);
        setData(songs);
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    };

    fetchSongs();
  }, [songId]);

  const editSong = (song) => {
    navigation.navigate("SongView", { songId: song.id });
  };

  const addChord = (sectionIndex, lineIndex, charIndex) => {
    // Implementa aquí tu lógica para agregar acordes si aún no la tienes.
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%' }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <FontAwesome name="arrow-left" size={30} color="black" />
          </TouchableOpacity>

          <View style={styles.categoryContainer}>
            {data?.categories?.map((x) => (
              <View key={x.id} style={styles.category}>
                <Text style={styles.categoryText}>{x.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.zoomButtons}>
            <TouchableOpacity
              onPress={() => setZoom((z) => Math.min(z + 0.1, 2))}
            >
              <FontAwesome name="plus" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setZoom((z) => Math.max(z - 0.1, 0.5))}
            >
              <FontAwesome name="minus" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Nombre y autor (sin zoom) */}
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.artist}>{data.autor}</Text>

        {/* Contenido escalable (solo la canción) */}
        <ScrollView
          horizontal={false}
          contentContainerStyle={{
            alignItems: "flex-start",
            minHeight:"100%"
          }}
        >
          <View
            style={{
              transform: [{ scale: zoom }],
              transformOrigin: "top left",
              alignSelf: "flex-start"
              
            }}
          >
            {data?.song?.map((section, sectionIndex) => (
              <View key={sectionIndex} style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{section.type}</Text>

                {section.lyrics.map((line, lineIndex) => {
                  const characters = line.text.split("");
                  return (
                    <View key={lineIndex} style={styles.lineContainer}>
                      <View style={styles.chordsRow}>
                        {characters.map((char, charIndex) => (
                          <TouchableOpacity
                            key={charIndex}
                            onPress={() =>
                              addChord(sectionIndex, lineIndex, charIndex)
                            }
                            style={{
                              minWidth: char === " " ? 7 : 8,
                              alignItems: "center",
                            }}
                          >
                            <Text style={styles.chord}>
                              {line.chords?.[charIndex] || " "}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>

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
          </View>
        </ScrollView>

        {/* Botón editar */}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <FontAwesome
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

// 🎨 Estilos
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F5F5F5", flex: 1, height:"100%" },
  header: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8",
    paddingBottom: 6,
    height: 60,
    alignItems: "center",
  },
  backButton: {
    width: "10%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryContainer: {
    width: "70%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  category: {
    marginHorizontal: 2,
  },
  categoryText: {
    color: "#969292",
    fontSize: 13,
  },
  zoomButtons: {
    width: "20%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 5,
  },
  artist: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "left",
    marginBottom: 20,
  },
  
  sectionContainer: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 10,
  },
  lineContainer: { marginBottom: 10 },
  chordsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  lyricsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  word: {
    fontSize: 16,
    color: "black",
  },
  chord: {
    fontSize: 14,
    color: "#FF5733",
    fontWeight: "bold",
  },
  space: {
    fontSize: 10,
    color: "transparent",
    minWidth: 1,
  },
});

export default SongViewId;
