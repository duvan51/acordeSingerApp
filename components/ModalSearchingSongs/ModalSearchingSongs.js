import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import SearchInput from "../../components/input/searchInput";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { searchingSongs, getSongs } from "../../apis/api";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ModalSearchingSong = ({songSelect}) => {
  const navigation = useNavigation();
  const [openModal2, setOpenModal2] = useState(false); //abrir modal para escoger canciones
  const [selectSongs, setSelectSongs] = useState([]); //canciones selections
  const route = useRoute();

  const [results, setResults] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { categoryProp } = route.params || {};





  //funcion select songs
  const handleSelect = (value) => {
    if (selectSongs.includes(value)) {
      setSelectSongs(selectSongs.filter((x) => x !== value));
      
    } else {
      setSelectSongs([...selectSongs, value]);
    }
  };





  //datos al padre
  const sendDataFather = () => {
     const selectedSongData = songs.filter((song) => selectSongs.includes(song.id));
    songSelect(selectedSongData);
  }


  //console.log("------>", songs[0].id)


  
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await getSongs(); // Esperamos la respuesta
        setSongs(songs); // Guardamos los datos en el estado
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    };
    fetchSongs();
  }, []);





  const searchSongs = async (query) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await searchingSongs(query);
      setResults(response);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    } finally {
      setLoading(false);
    }
  };







  const modal = () => {
    return (
      <Modal
        visible={openModal2}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setOpenModal2(false)}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              paddingTop: 20,
              paddingHorizontal: 10,
              backgroundColor: "white",
              width: "90%",
              height: "90%",
              borderRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: 80,
                borderBottom: 1,
                borderBottomColor: "black",
              }}
            >
              <View
                style={{
                  width: "15%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity onPress={() => setOpenModal2(false)}>
                  <FontAwesome name="arrow-left" size={30} color="black" />
                </TouchableOpacity>
              </View>

              <View style={{ width: "85%", height: "100%" }}>
                <SearchInput
                  onSearch={searchSongs}
                  categoryProp={categoryProp}
                />
              </View>
            </View>

            <View>
              {loading && <ActivityIndicator size="large" color="blue" />}

              {results.length > 0 ? (
                <FlatList
                  data={results}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SearchingList", {
                          query: item.name,
                        })
                      }
                      style={{
                        flexDirection: "row",
                        padding: 10,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: "10%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome name="search" size={13} color="black" />
                      </View>
                      <Text style={{ fontSize: 12, flex: 1 }}>{item.name}</Text>
                      <View
                        style={{
                          width: "10%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome5
                          name="chevron-right"
                          size={13}
                          color="black"
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                songs?.map((song) => {
                  const isSelected = selectSongs.includes(song.id);

                  return (
                    <TouchableOpacity
                      key={song.id}
                      onPress={() => handleSelect(song.id)}
                      style={{
                        flexDirection: "row",
                        padding: 10,
                        alignItems: "center",
                        backgroundColor: isSelected ? "#4caf50" : "#fff",
                        borderRadius: 6,
                        marginVertical: 3,
                      }}
                    >
                      <View
                        style={{
                          width: "10%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome
                          name="music"
                          size={13}
                          color={isSelected ? "white" : "black"}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          flex: 1,
                          color: isSelected ? "white" : "black",
                        }}
                      >
                        {song.name}
                      </Text>
                      <View
                        style={{
                          width: "10%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {isSelected && (
                          <FontAwesome5 name="check" size={13} color="white" />
                        )}
                      </View>
                    </TouchableOpacity>
                    
                  );
                  
                })
              )}
              <View style={{marginTop:20}}>
                <TouchableOpacity onPress={() => { sendDataFather(), setOpenModal2(false) }}>
                  <Text>Seleccionar Cancion</Text>      
                </TouchableOpacity> 
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setOpenModal2(true)}
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2
        }}
      >
         <Feather name="edit" size={15} color="Black" />
         <Text style={{color:"Black"}}>Agregar</Text>
      </TouchableOpacity>
      {modal()}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ModalSearchingSong;
