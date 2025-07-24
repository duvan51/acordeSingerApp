import React, { use, useEffect, useState } from "react";
import { getSongById } from "../../apis/api.js";
import { StyleSheet, Text } from "react-native";

const NameOriginal = ({ x }) => {
  const [songName, setSongName] = useState("");

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await getSongById(x); // 👈 Aquí usamos await
        setSongName(response.name); // o response.id si quieres eso
        console.log("Nombre de la canción:", response);
      } catch (error) {
        console.log(error);
      }
    };

    if (x) {
      fetchSong(); // 👈 Ejecutas la función async dentro del useEffect
    }
  }, [x]);



  
  return (
    <Text style={{ color: "black", fontSize: 14 }}>
      {songName ?? "Sin nombre"}
    </Text>
  );
};
export default NameOriginal;
