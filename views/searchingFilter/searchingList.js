import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import SearchInput from "../../components/input/searchInput";
import {searchingSongs} from "../../apis/api";
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const SearchingList = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { query } = route.params;


  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await searchingSongs(query); // Hace una búsqueda más amplia
        setSongs(response);
      } catch (error) {
        console.error("Error al obtener resultados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  //console.log(songs)


  const handleSelectSong = (song) => {
    navigation.navigate("SongViewId", { songId: song.id });
  };

 
  
  return (
    <View style={{ paddingTop: 20, paddingHorizontal: 10 }}>
      <View style={{ 
          flexDirection: "row", 
          width: "100%", 
          height: 80,
          borderBottom:1,
          borderBottomColor:"black"
          }}>
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

        <TouchableOpacity  style={{ width: "85%", height: "100%" }} onPress={() => navigation.navigate("SearchingLive")}>
          <SearchInput isDisabled={true} query={query} />
        </TouchableOpacity >
      </View>

      <View>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : songs.length > 0 ? (
        
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectSong(item)}> 
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd", flexDirection:"row" }}>
              <View style={{width:"80%"}}>
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                <Text style={{ color: "gray" }}>{item.autor}</Text>
              </View>
              {
                item.song[0]?.lyrics[0]?.chords[0] ? (
                  <View style={{width:"20%", height:"100%", justifyContent:"center", alignItems:"center"}}>
                    <Text style={{ fontSize: 20 }}>
                      {item.song[0].lyrics[0].chords[0]}
                    </Text>
                  </View>
                ):(
                  <View style={{width:"20%", height:"100%", justifyContent:"center", alignItems:"center"}}>
                    <Text style={{ fontSize: 20 }}>
                      <FontAwesome name="question-circle" size={24} color="black" />
                    </Text>
                  </View>
                )
              }
              
            </View>
            </TouchableOpacity>
          )}
        />
        
      ) : (
        <Text>No se encontraron más resultados.</Text>
      )}
      </View>



    </View>
  )
}

export default SearchingList