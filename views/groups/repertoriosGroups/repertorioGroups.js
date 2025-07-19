import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ListaCanciones({ repertorio }) {
  return (
    <View style={styles.container}>
      {repertorio?.repertorio_song_category?.map((categoria) => (
        <View key={categoria.id} style={styles.section}>
          <Text style={styles.sectionTitle}>{categoria.nombre}</Text>
          
          <View style={styles.separator} />

          {categoria.custom_songs?.map((grupo) => (
            <View key={grupo.original_song_id} style={styles.songGroup}>
              <Text style={styles.originalSong}>{grupo.original_song?.name}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  section: {
    backgroundColor: "#072042",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "white",
    marginVertical: 10,
  },
  songGroup: {
    paddingLeft: 10,
  },
  originalSong: {
    color: "#00ccff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  songText: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
  },
});

export default ListaCanciones;
