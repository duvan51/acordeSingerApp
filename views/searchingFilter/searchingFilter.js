import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, } from "react-native";
import SearchInput from "../../components/input/searchInput";
import { useNavigation } from "@react-navigation/native";

import { getCategories, getSongs } from "../../apis/api.js";

import imageP from "../../assets/espiritu-santo.png";
import FontAwesome from "react-native-vector-icons/FontAwesome";


const SearchingFilter = () => {
  const [data, setData] = useState({});
  const [songs, setSongs] = useState([]);
  const navigation = useNavigation();

  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const songs = await getCategories(); // Esperamos la respuesta
        setData(songs); // Guardamos los datos en el estado

        const fallback = await getSongs();
        setSongs(fallback);
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    };

    fetchCategorias();
  }, []);

  


  const handleSelectSong = (song) => {
    navigation.navigate("SongViewId", { songId: song.id });
  };

  

  return (
    <View style={{ fontSize: 17, paddingTop: 20, paddingHorizontal: 10, paddingBottom:160 }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SearchingLive", { categoryProp: category })
        }
      >
        <SearchInput isDisabled={true} />
      </TouchableOpacity>

      {/**categorias */}
      <ScrollView>
        <Text style={{ 
          fontSize: 12, 
          fontWeight: "800", 
          paddingVertical: 5 
        }}>
          Categorias
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {Array.isArray(data) ? (
            data.map((x) => (
              <TouchableOpacity
                key={x.id}
                style={{
                  fontSize: 17,
                  width: "48%",
                  height: 50,
                  backgroundColor: "#FFFF",
                  borderRadius: 10,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  marginBottom: 10,
                }}
                onPress={() =>
                  navigation.navigate("SearchingList", { query: x.name })
                }
              >
                <View
                  style={{
                    paddingVertical: 2,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <View
                    style={{
                      width: "70%",
                      height: "100%",
                      justifyContent: "center",
                      fontWeight: "300",
                    }}
                  >
                    <Text>{x.name}</Text>
                  </View>
                  <View style={{ width: "30%", height: "100%" }}>
                    {x.image_url ? (
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{ uri: x.image_url }}
                      />
                    ) : (
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{ uri: imageP }}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Cargando o sin datos...</Text>
          )}
        </View>

        <View style={{
          marginTop: 20,
          borderTopWidth: 2, 
          borderTopColor: '#ffffff',
          paddingBottom:30
        }}>
          <View>
            <Text style={{ 
          fontSize: 12, 
          fontWeight: "800", 
          paddingVertical: 5 
        }}>
              Algunas Canciones
            </Text>
          </View>

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
                    height:60
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
      </ScrollView>
    </View>
  );
};

export default SearchingFilter;
