import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  ScrollView 
} from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";
import { getSongs } from "../../apis/api.js";

//import Carrousel from "../../components/carrousel.js";
//import CarrouselCategoriasSongs from "../../components/carrouselCategorias.js";


import SearchInput from "../../components/input/searchInput.js";

 



const Searching = ({ navigation }) => {
  
  const [data, setData] = useState([]);
  const navigations = useNavigation();

  console.log(data)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await getSongs(); // Esperamos la respuesta
        setData(songs); // Guardamos los datos en el estado
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    };

    fetchSongs();
  }, []);

  const handleSelectSong = (song) => {
    navigation.navigate("SongViewId", { songId: song.id });
  };


// ---------------filterSongsByCategory   -----------  // 

const filterSongsByCategory = (categoryName) => {
  const songsFilter = data.filter(song => 
    song.categories.some(category => category.name === categoryName || category.name.trim() === '')
  );

  return (
    <View>
      {Array.isArray(songsFilter) && songsFilter.length > 0 ? (
        songsFilter.map(x => (
          <TouchableOpacity
            onPress={() => handleSelectSong(x)}
            key={x.id}
            style={{
              width: "100%",
              borderBottomColor: "#F5F5F5",
              paddingVertical: 5,
              borderBottomWidth: 1,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 5,
              }}
            >
              <Text style={{ fontSize: 17 }}>{x.name}</Text>
              <Text
                style={{
                  color: "#FF5733",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {x.song?.[0]?.lyrics?.[0]?.chords?.[0] || "Sin acordes"}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text>Cargando o sin datos...</Text>
      )}
    </View>
  );
};



  return (
      <View style={style.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
        
        <TouchableOpacity   onPress={() => navigations.navigate("SearchingLive")}>
          <SearchInput />
        </TouchableOpacity>
        
        <View style={{ marginBottom: 1 }}>
          <Text style={{ fontSize: 17, fontWeight: "800", marginBottom: 20 }}>
            Popular songs
          </Text>
          {
            /*
          
          <Carrousel />
            */
          }
        </View>


      {/* sugerencias */}
        <View style={{  marginTop: 40 }}>
          <Text style={{ fontSize: 17, fontWeight: "800", marginTop: 5 }}>
            ❤️ Sugerencias Para ti
          </Text>
          <View
          style={{
            width: "100%",
            paddingVertical: 10,
            minHeight: 50,
          }}
        >
            {
             filterSongsByCategory("adoracion") 
            }
          </View>
        </View>

      {/* generos */}
        <View style={{marginTop: 30}}>
          <Text style={{ fontSize: 17, fontWeight: "800", marginBottom: 20 }}>
            Generos
          </Text>
          {
            /*
          <CarrouselCategoriasSongs />
            */
          }
        </View>

      {/* sugerencias */}
       <View style={{  marginTop: 40 }}>
          <Text style={{ fontSize: 17, fontWeight: "800", marginTop: 5 }}>
            🪇 Alabanzas
          </Text>
          <View
          style={{
            width: "100%",
            paddingVertical: 10,
            minHeight: 50,
          }}
        >
            {
             filterSongsByCategory("alabanza") 
            }
          </View>
        </View>


        {/* Este texto debe ser visible */}
        <View style={{  marginTop: 40 }}>
          <Text style={{ fontSize: 17, fontWeight: "800", marginTop: 5 }}>
            🪇 Alabanzas
          </Text>
          <View
          style={{
            width: "100%",
            paddingVertical: 10,
            minHeight: 50,
          }}
        >
            {
             filterSongsByCategory() 
            }
          </View>
        </View>


        </ScrollView>
      </View>

  );
};
export default Searching;

const style = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    paddingHorizontal: 10,

  },
  prueba: {
    backgroundColor: "red",
  },
  popularSong: {
    height: "auto",
  },
});
