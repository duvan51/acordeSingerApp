import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {getSongById} from "../../../apis/api"



const ListSong= ({song_id})=>{
    const [song, setSong] = useState({});
    
    useEffect(() => {
        const fetchRepertorios = async () => {
          try {
            const song = await getSongById(song_id); 
            setSong(song); 
            //console.log(song)
          } catch (error) {
            console.error("Error al obtener el grupo:", error);
          }
        };
    
        fetchRepertorios();
  }, []);

    return(
        <View style={{}}>
          <Text style={{ color: "white" }}>{song.name}</Text>
        </View>
    )
  }

  export default ListSong;