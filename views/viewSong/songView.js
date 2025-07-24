import { useState, useEffect } from "react";
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
  Pressable,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { updateSong, getSongById, getCategories } from "../../apis/api.js";

const screenWidth = Dimensions.get("window").width;

const SongView = ({ navigation }) => {
  const route = useRoute();
  const { songId } = route.params || {};

  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [chord, setChord] = useState(""); // Estado para el acorde ingresado
  const [currentChordData, setCurrentChordData] = useState({}); // Información para el acorde

  const [buttonTransport, setButtonTransport] = useState("subir");

  if (!songId) {
    return <Text>No se encontró la canción</Text>;
  }

  //funcion para agregar acordes a una cancion
  const addChord = (sectionIndex, lineIndex, wordIndex) => {
    setCurrentChordData({ sectionIndex, lineIndex, wordIndex });
    setModalVisible(true); // Muestra el modal
  };

  const handleAddChord = () => {
    const { sectionIndex, lineIndex, wordIndex } = currentChordData;
    if (!chord) return;

    // Copia profunda para evitar mutaciones
    const newData = JSON.parse(JSON.stringify(data));

    // Validar que la estructura existe
    if (!newData.song[sectionIndex].lyrics[lineIndex].chords) {
      newData.song[sectionIndex].lyrics[lineIndex].chords = {};
    }

    function acordeMayuscula(str) {
      return str[0].toUpperCase() + str.slice(1);
    }

    // Agregar el acorde en la posición correcta
    newData.song[sectionIndex].lyrics[lineIndex].chords[wordIndex] =
      acordeMayuscula(chord);

    setData(newData); // 🔥 Se actualiza `data` en lugar de `song`
    setChord("");
    setModalVisible(false);
  };

  // llamar la api para canciones
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

  //llamar la api para categorias
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getCategories(); // Esperamos la respuesta
        setCategories(categories); // Guardamos los datos en el estado
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    };
    fetchCategory();
  }, []);

  const updatesong = async () => {
    const id = songId;
    try {
      await updateSong(id, {
        song: data.song,
        categories: selectedCategories.map((c) => c),
      });
    } catch (error) {
      console.log("error=>", error);
    }
  };

  const Transport = (modo) => {
    if (!data?.song) return;

    const acorde = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];

    // Función para transponer acordes
    const transponerAcorde = (x) => {
      const index = acorde.indexOf(x);
      if (index === -1) return x; // Si el acorde no se encuentra, lo dejamos igual

      if (modo === "subir") {
        return acorde[(index + 1) % acorde.length];
      } else if (modo === "bajar") {
        return index === 0 ? acorde[acorde.length - 1] : acorde[index - 1];
      }

      return x; // Por si no entra en ninguna condición
    };

    // Crear una copia profunda de los datos
    const newData = JSON.parse(JSON.stringify(data));

    // Iterar sobre cada sección y línea para modificar los acordes
    newData.song.forEach((section) => {
      section.lyrics.forEach((line) => {
        if (line.chords) {
          Object.keys(line.chords).forEach((wordIndex) => {
            line.chords[wordIndex] = transponerAcorde(line.chords[wordIndex]);
          });
        }
      });
    });

    setData(newData);
  };

  const addCategories = (id) => {
    if (selectedCategories.includes(id)) {
      // Si ya está seleccionado, lo quitamos
      setSelectedCategories(selectedCategories.filter((item) => item !== id));
    } else {
      // Si no está seleccionado, lo agregamos
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Button title="Subir tono" onPress={() => Transport("subir")}>
          Subir tono
        </Button>
        <Button title="Bajar tono" onPress={() => Transport("bajar")}>
          Bajar tono
        </Button>

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
                        onPress={() =>
                          addChord(sectionIndex, lineIndex, charIndex)
                        }
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
                        onPress={() =>
                          addChord(sectionIndex, lineIndex, charIndex)
                        }
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

        {/* Modal para ingresar acorde */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Agregar un acorde</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa el acorde"
                value={chord}
                onChangeText={setChord}
              />
              <View style={styles.modalButtons}>
                <Button
                  title="Cancelar"
                  onPress={() => setModalVisible(false)}
                />
                <Button title="Agregar" onPress={handleAddChord} />
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ marginTop: 20, width: "100%" }}>
          <Button
            title="Actualizar"
            onPress={updatesong}
            style={{ width: "100%" }}
          />
        </View>

        <View style={styles.containerCategorias}>
          {categories?.map((x) => (
            <Pressable
              key={x.id}
              style={[
                styles.categoryChip,
                selectedCategories.includes(x.id) && styles.selectedChip,
              ]}
              onPress={() => addCategories(x.id)}
            >
              <Text style={styles.categoryText}>{x.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
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

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  containerCategorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    margin: 10,
  },
  categoryChip: {
    borderRadius: 20,
    backgroundColor: "#ffff",
    color: "#000000",
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  categoryText: {
    color: "black",
    fontSize: 14,
  },

  selectedChip: {
    backgroundColor: "#FF5733",
    color: "#ffff",
  },

  // aqui viene el nuevo codigo

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
    fontSize: 10,
    color: "black",
  },
  chord: {
    fontSize: 10,
    color: "blue",
  },
  space: {
    fontSize: 10,
    color: "transparent",
    minWidth: 1,
  },
});

export default SongView;
