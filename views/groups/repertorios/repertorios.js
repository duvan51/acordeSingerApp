import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";

import { useRoute, useFocusEffect, useNavigation } from "@react-navigation/native";


import {getRepertorioId, getRepertorioSongCategoryId} from "../../../apis/api"

import ListaCanciones from "../repertoriosGroups/repertorioGroups";
import Comentarios from "./comentarios/comentarios";


const Repertorios = ({data}) => {
    const navigation = useNavigation();
    const [repertorio, setRepertorio] = useState({});
   






    const fetchRepertorios = async () => {
      try {
        const repertorios = await getRepertorioId(data.id); 
        setRepertorio(repertorios); 
      } catch (error) {
        console.error("Error al obtener el grupo:", error);
        }
    };


    useEffect(() => {
      fetchRepertorios();
    }, [data]);


     return (
        <View
              style={{
                width: "90%",
                paddingVertical: 20,
                backgroundColor: "white",
                paddingHorizontal: 20,
                marginBottom:40,
                borderRadius: 10
              }}
            >
              <View style={{ width: "100%" }}>
                <View
                  style={{ width: "100%", paddingBottom: 20, flexDirection: "row" }}
                >
                  <View style={{ width: "50%" }}>
                    <Text>{repertorio.nombre}</Text>
                    <Text>{repertorio.fecha}</Text>
                  </View>
                  <View style={{ width: "50%", alignItems: "flex-end" }}>
                    <Text>hace 3 días</Text>
    
                    {/**ver el concierto */}
                    <TouchableOpacity 
                      onPress={() => navigation.navigate("ConciertoView",{repertorio})
                    }>
                        <View><Text>View Concierto</Text></View>
                    </TouchableOpacity>

                  </View>
                </View>
    

                <View style={{ width: "100%", flex: 1, gap: 20 }}>
                  {
                    <ListaCanciones repertorio={repertorio} />
                  }
                  
                </View>
                <View style={{width: "100%"}} >
                  <Comentarios 
                    comentarios={repertorio.comentarios} 
                    idRepertorio={repertorio.id} 
                    onComentarioGuardado={fetchRepertorios}
                  />
                </View>
              </View>
            </View>
  )
}

const styles = StyleSheet.create({
    profileImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      position: "absolute",
    },
    imagenGroups: {
      width: "100%",
      height: "100%",
    },
    textArea: {
      height: 120,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      textAlignVertical: "top", // importante para multiline
    },
  });
  

export default Repertorios