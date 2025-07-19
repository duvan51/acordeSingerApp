import React from "react";
import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import SearchInput from "../../components/input/searchInput";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {searchingSongs} from "../../apis/api";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const SearchLive = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const { categoryProp } = route.params || {};




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

  

  return (
    <View style={{  paddingTop: 20, paddingHorizontal: 10 }}>
      
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
            onPress={() => navigation.navigate("SearchingList", { query: item.name })}
            style={{ flexDirection: "row", padding: 10, alignItems: "center" }}
          >
            <View style={{ width: "10%", justifyContent: "center", alignItems: "center" }}>
              <FontAwesome name="search" size={13} color="black" />
            </View>
            <Text style={{ fontSize: 12, flex: 1 }}>{item.name}</Text>
            <View style={{ width: "10%", justifyContent: "center", alignItems: "center" }}>
              <FontAwesome5 name="chevron-right" size={13} color="black" />
            </View>
          </TouchableOpacity>
        )}
            />
        ):(
            <View>
                <Text>No hay datos</Text>
            </View>
        )  }
        
      </View>
    </View>
  );
};

export default SearchLive;
