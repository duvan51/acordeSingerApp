import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import SearchInput from "../../components/input/searchInput";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { searchingSongs, getSongs } from "../../apis/api";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SearchLive = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [results, setResults] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { categoryProp } = route.params || {};



  useEffect(() => {
    const fetchDefaultSongs = async () => {
      setLoading(true);
      try {
        const response = await getSongs();
        setResults(response);
        setSongs(response);
      } catch (error) {
        console.error("Error al cargar las canciones iniciales:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDefaultSongs();
  }, []);



  // ✅ Al buscar manualmente
  const searchSongs = async (query) => {
    if (query.length < 2) {
      // Si el query es muy corto, mostrar por defecto
      const fallback = await getSongs();
      setResults(fallback);
      
      return;
    }
    setLoading(true);
    try {
      const response = await searchingSongs(query);
      // console.log("Primera búsqueda -->", response);
      if (Array.isArray(response) && response.length === 0) {
        // Si la respuesta está vacía, fallback
        const fallbackResponse = await getSongs();
        //  console.log("Segunda búsqueda -->", fallbackResponse);
        setResults(fallbackResponse);
      } else {
        setResults(response);
      }
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    } finally {
      setLoading(false);
    }
  };



  const handleSelectSong = (song) => {
    navigation.navigate("SongViewId", { songId: song.id });
  };


  return (
    <View style={{ paddingTop: 20, paddingHorizontal: 10 }}>
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ width: "85%", height: "100%" }}>
          <SearchInput onSearch={searchSongs} categoryProp={categoryProp} />
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
                  navigation.navigate("SearchingList", { query: item.name })
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
                  <FontAwesome5 name="chevron-right" size={13} color="black" />
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View>
            <Text>No hay datos</Text>
          </View>
        )}

        <View style={{ 
          marginTop: 20,
          borderTopWidth: 2, 
          borderTopColor: '#ffffff'
        }}>
          <FlatList
            data={songs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectSong(item)}>
                <View
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ddd",
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "80%" }}>
                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ color: "gray" }}>{item.autor}</Text>
                  </View>
                  {item.song[0]?.lyrics[0]?.chords[0] ? (
                    <View
                      style={{
                        width: "20%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>
                        {item.song[0].lyrics[0].chords[0]}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: "20%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>
                        <FontAwesome
                          name="question-circle"
                          size={24}
                          color="black"
                        />
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchLive;
