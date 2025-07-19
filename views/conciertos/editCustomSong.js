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
import {
  DeletedCustom,
  UpdateCustomSong,
  getCustomSongById,
} from "../../apis/api.js";
import AntDesign from "react-native-vector-icons/AntDesign";

const screenWidth = Dimensions.get("window").width;
const EditCustomSong = ({ customSongId }) => {
  const [data, setData] = useState({});
  const [openModal6, setOpenModal6] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [chord, setChord] = useState(""); // Estado para el acorde ingresado
  const [currentChordData, setCurrentChordData] = useState({}); // Información para el acorde

  const [buttonTransport, setButtonTransport] = useState("subir");

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
    if (!newData.lyrics[sectionIndex].lyrics[lineIndex].chords) {
      newData.lyrics[sectionIndex].lyrics[lineIndex].chords = {};
    }

    function acordeMayuscula(str) {
      return str[0].toUpperCase() + str.slice(1);
    }

    // Agregar el acorde en la posición correcta
    newData.lyrics[sectionIndex].lyrics[lineIndex].chords[wordIndex] =
      acordeMayuscula(chord);

    setData(newData); // 🔥 Se actualiza `data` en lugar de `song`
    setChord("");
    setModalVisible(false);
  };

  //llamar api custom song id

  useEffect(() => {
    if (customSongId != 0) {
      const fetchSongs = async () => {
        try {
          const response = await getCustomSongById(customSongId); // Esperamos la respuesta
          setData(response);
          console.log("--->>>>", response); // Guardamos los datos en el estado
        } catch (error) {
          console.error("Error al obtener la customSong:", error);
        }
      };
      fetchSongs();
    }
  }, [customSongId]);

  const updatesong = async () => {
    const id = customSongId;
    try {
      const result = await UpdateCustomSong(id, data);
      console.log("este es el resultado", result)
    } catch (error) {
      console.log("error=>", error);
    }
     {/**  */}
  };

  const Transport = (modo) => {
    if (!data?.lyrics) return;

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
    newData.lyrics.forEach((section) => {
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







  const DeletedModal = async  (id)=>{
    try {
      const product = await DeletedCustom(id)
       console.log("este es el resultado", product )
       setOpenModal6(false)
    } catch (error) {
      console.log("error=>", error);
    }
  }
    const DeletedProductModal = (customSongId) => {
      return (
        <Modal
          visible={openModal6}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setOpenModal6(false)}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              justifyContent:"center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "30%",
                backgroundColor: "white",
                
                paddingHorizontal: 20,
                paddingVertical: 20,
                borderTopEndRadius: 20,
                borderTopStartRadius: 20,
              }}
            >
              {/* Botón de cerrar dentro del contenido */}
              <TouchableOpacity
                onPress={() => setOpenModal6(false)}
                style={{ alignSelf: "flex-end", marginBottom: 10 }}
              >
                <AntDesign name="close" size={30} color="black" />
              </TouchableOpacity>
  
              <View style={styles.container}>
                <View>
                  <Text>Deseas Eliminar esta custom ? </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={()=> DeletedModal(customSongId)}
                >
                  <Text style={styles.buttonText}>Agregar</Text>
                </TouchableOpacity>



              </View>
            </View>
          </View>
        </Modal>
      );
    };





  if (!customSongId) {
    return <Text>No se encontró la customSong</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: "row", justifyContent:"flex-end" }}>
            <Text style={{ marginRight: 8, fontSize:12 }}>Actualizada:</Text>
            <Text style={{ fontSize:12 }}>{data.updated_at}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent:"flex-end" }}>
          <View style={{ marginRight: 8 }}>
            <Button title="Subir tono" onPress={() => Transport("subir")} />
          </View>
          <View>
            <Button title="Bajar tono" onPress={() => Transport("bajar")} />
          </View>
        </View>

        {data?.lyrics?.map((section, sectionIndex) => (
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




        <View style={{}}>
          <TouchableOpacity
             onPress={() => setOpenModal6(true)}
          > 
            <Text>
              Deleted Version
            </Text>
          </TouchableOpacity>
          {DeletedProductModal(customSongId)}
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



  //aqui viene la modal 
   container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },
});

export default EditCustomSong;
