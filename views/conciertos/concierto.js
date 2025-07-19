import React, { useEffect, useState } from "react";
import { createRepertorio, getRepertorioSongCategoryId, createCustomSong  } from "../../apis/api.js";
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
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ConciertoSong from "./conciertoSong.js"
import CreateRepertorioSongCat from './createRepertorySongCat.js'
import ModalSearchingSong from "../../components/ModalSearchingSongs/ModalSearchingSongs.js";
import AddVersionModal from "./addVersionModal.js"
import EditCustomSong from "./editCustomSong.js"


const ConviertoSongViewId = ({ navigation }) => {

  const route = useRoute();
  const [repertorySongCategoryId, setRepertorySongCategoryId] = useState(0)
  const [dataCustomSong, setDataCustomSong] = useState([])
  const [versionesCustomSong, setVersionesCustomSong] = useState([])
  const [songCustomId, setSongCustomId] = useState(0) //song de la custom


  const [formData, setFormData] = useState({});


  //aqui es para crear los custom Song Id
  const [repertorioIdSong, setIdRepertorioSong] =useState(0)
  const [songRecibida, setSongRecibida] =useState(0)


  //pintar seleccionados 
  const [selectFirstList, setFirstList] = useState(null)
  const [selectSecondtList, setSecondtList] = useState(null)
  const [selectThreeList, setThreeList] = useState(null)

 

  const { repertorio } = route.params || {};


 

  useEffect(() => {
    const fetchRepertorios = async (id) => {
      try {
        const customSong = await getRepertorioSongCategoryId(id);
        setDataCustomSong(customSong);

        
      } catch (error) {
        console.error("Error al obtener el repertorio:", error);
      }
    };
  

    if (typeof repertorySongCategoryId === 'number' && repertorySongCategoryId !== 0) {
    //  console.log("✅ Hay repertorio group:", repertorySongCategoryId);
       fetchRepertorios(repertorySongCategoryId);
       setIdRepertorioSong(repertorySongCategoryId);
       
       

    } else if (
      repertorio?.repertorio_song_category?.length > 0 &&
      repertorio.repertorio_song_category[0]?.id &&
      repertorio.repertorio_song_category[0].id !== 0
    ) {
      const idRepertorioSong = repertorio.repertorio_song_category[0].id;
     // console.log("📌 Usamos repertorio songID por defecto:", idRepertorioSong);
      fetchRepertorios(idRepertorioSong);

      setIdRepertorioSong(idRepertorioSong);

    } else {
      console.log("❌ No se hace ninguna petición. repertorySongCategoryId:", repertorySongCategoryId);
    }
  }, [repertorySongCategoryId, repertorio, ]);



  
  useEffect(() => {
    if (
      dataCustomSong?.custom_songs &&
      Array.isArray(dataCustomSong.custom_songs) &&
      dataCustomSong.custom_songs.length > 0
    ) {
      const versiones = dataCustomSong.custom_songs[0].versiones;
  
      if (Array.isArray(versiones) && versiones.length > 0) {
        //console.log("versiones disponibles:", versiones);
  
        if (versionesCustomSong.length === 0) {
          setVersionesCustomSong(versiones);
        }
  
        // Si songCustomId está vacío, establecemos el ID de la primera versión
        if (Object.keys(songCustomId).length === 0) {
          setSongCustomId(versiones[0].id);
          //setSongDefault(versiones[0])
        }
      }
    }
  }, [dataCustomSong]);
  

 
  //aqui agregamos canciones a un grupo
  const handlSongOfModal = (songSelectId)=>{
   // console.log(" ---song select--- ",songSelectId)
   // const dataSong = await 
    setSongRecibida(songSelectId);
    console.log("cancion seleccionada", songSelectId)
  }


  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      repertorio_id : repertorio.id,
      song_id : songRecibida[0]?.id,
      repertorio_song_category_id: repertorioIdSong
    }));
  }, [songRecibida]);
  
  useEffect(() => {
    if (formData.song_id && formData.repertorio_id && formData.repertorio_song_category_id) {
      handleCreateSong();
    }
  }, [formData]);

  const handleCreateSong = async() =>{
    try {
      const data = await  createCustomSong(formData);
       Alert.alert("Agregado correctamente")
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert("Error", "al agregar la cancion");
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "rgb(216, 216, 216);",
            paddingBottom: 6,
            height: 60,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", width: "70%" }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: "30%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="arrow-left" size={30} color="black" />
            </TouchableOpacity>
            <View style={{ width: "70%" }}>
              <Text>{repertorio?.nombre}</Text>
              <Text>{repertorio?.fecha}</Text>
            </View>
          </View>

          <View
            style={{
              width: "30%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <FontAwesome name="plus" size={15} color="black" />
            </View>
            <View>
              <FontAwesome name="minus" size={15} color="black" />
            </View>
          </View>
        </View>

        <View style={{ width: "100%" }}>
          {/**primer listado */}
          <View style={{ width: "100%", backgroundColor: "#072042", paddingHorizontal:20, height:30 }}>
            <View style={{ width: "100%", flex: 1, flexDirection: "row",  justifyContent: "space-between"}}>
                {
                  repertorio?.repertorio_song_category?.map((x) => (
                    <TouchableOpacity
                    onPress={() =>{setRepertorySongCategoryId(x.id);  setFirstList(x.id)} }
                    key={x.id}
                    style={{
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: selectFirstList === x.id ? "#1b3454" : "#072042"
                        }}
                    >
                      <Text style={{
                        color: 'white',
                        borderRadius: 1,
                        borderBottomColor: selectFirstList === x.id ? "white" : "#072042",
                        fontWeight: selectFirstList === x.id ? "600" : "100",
                        borderBottomWidth: 2,
                        padding: 5
                        }}>{x.nombre}</Text>
                      <View
                       style={{
                        height:1,
                        backgroundColor:"re"                       
                      }}
                      ></View>

                    </TouchableOpacity>
                  ))
                  
                }
                <CreateRepertorioSongCat idRepertorio={repertorio.id} />
            </View>
          </View>


        {/** segundo listado */}
          <View style={{ width: "100%", backgroundColor: "white", paddingHorizontal:20, height:30 }}>
            <View style={{ width: "100%", flex: 1, flexDirection: "row",  justifyContent: "space-between"}}>
                 
                  {
                    dataCustomSong?.custom_songs?.map((z)=>(
                      <TouchableOpacity
                        key={z.original_song_id}
                        onPress={() => {setVersionesCustomSong(z?.versiones); setSecondtList(z.original_song_id)}}
                        style={{
                          height: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: selectSecondtList === z.original_song_id ? "#dbdbdb" : "white"
                        }}
                    >
                    <Text style={{
                        color:"black",
                        borderRadius: 1,
                        borderBottomColor: selectSecondtList === z.original_song_id ? "#072042" : "white",
                        fontWeight: selectSecondtList === z.original_song_id ? "600" : "100",
                        borderBottomWidth: 2,
                        padding: 5
                      
                      
                      }}>
                      {z?.original_song?.name}</Text>
                </TouchableOpacity>
                    ))
                  }
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{

                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        }}
                    >
                    <ModalSearchingSong songSelect={handlSongOfModal} />
                </TouchableOpacity>
            </View>
          </View>


      {/** Tercer listado */}
          <View style={{ width: "100%", backgroundColor: "#072042", paddingHorizontal:20, height:25 }}>
            <View style={{ width: "100%", flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
              {
                versionesCustomSong?.map((custSong)=>(
                //  console.log(custSong),
                  <TouchableOpacity
                    key={custSong.id}
                    onPress={() => {setSongCustomId(custSong.id); setThreeList(custSong.id)} }
                    style={{
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: selectThreeList === custSong.id ? "#1b3454" : "#072042"
                        }}
                    >
                    <Text style={{
                      color:"white",
                      borderBottomColor: selectThreeList === custSong.id ? "white" : "#072042",
                        fontWeight: selectThreeList === custSong.id ? "600" : "100",
                      }}>{custSong.title}</Text>
                </TouchableOpacity>
                ))
              }
              <View>
                <TouchableOpacity
                    onPress={() => console.log("Hellos")}
                    style={{
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        }}
                    >
                    <AddVersionModal 
                      repertorioID={repertorio.id} 
                      repertorioSongCategoryId={repertorioIdSong}
                      customSongID = {songCustomId }    
                    />
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>
      
         {
          /*
          songCustomId ? <ConciertoSong customSongId={songCustomId} /> : <Text>Debes seleccionar una cancion</Text>
         */

          <EditCustomSong customSongId={songCustomId} /> 
         
         }
        
        

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#F5F5F5" },
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
  sectionContainer: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 10,
  },
  lineContainer: { marginBottom: 5 },
  chordsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
  },
  lyricsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },

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
    fontSize: 14,
    color: "black",
  },
  chord: {
    fontSize: 14,
    color: "blue",
    fontWeight: "bold",
    color: "#FF5733",
  },
  space: {
    fontSize: 10,
    color: "transparent",
    minWidth: 1,
  },
});

export default ConviertoSongViewId;
