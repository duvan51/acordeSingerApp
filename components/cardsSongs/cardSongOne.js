import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { getSongs } from "../../apis/api.js";

const CardSongOne = () => {
  const [data, setData] = useState([]);

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





  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          width: "100%",
          height: 100,
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <View 
            style={{ 
              backgroundColor: "#072042", 
              height: "100%", 
              flex: 1, 
              justifyContent:"center",
              alignItems:"center",
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
              }}
            >
              <Text style={{
                fontSize:30,
                fontWeight:"bold", 
                color:"white",
                }}>
                1
              </Text>
           
          </View>

          <View style={{ backgroundColor: "#ffffff", height: "100%", flex: 3 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-around",
                height: "100%",
                paddingHorizontal:4
              }}
            >
              <Text style={{ fontWeight:"bold"}}>La cosecha</Text>
              <Text style={{ fontSize: 10 }}>
                alza tus ojos y mira la cosecha esta lista el tiempo ha llegado
                mies asdkalsdk lasmdlk asdlkamsdl laksmdlkasmdl kdmaslkdmlsam
                amskd
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around"}}
              >
                <Text style={{fontSize:10}}>Misionero</Text>
                <Text style={{fontSize:10}}>Misionero</Text>
                <Text style={{fontSize:10}}>Misionero</Text>
                <Text style={{fontSize:10}}>Misionero</Text>
              </View>
            </View>
          </View>

          <View style={{ 
            backgroundColor: "#ffffff", 
            height: "100%", 
            flex: 1, 
            justifyContent:"center",
            alignItems:"center",
            
            }}>
              <Text style={{
                fontSize:30, 
                fontWeight:"bold",
                color:"#d6d6d6"
              }}>
                Am
              </Text>
            
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CardSongOne;
