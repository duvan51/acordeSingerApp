import React, { useState, useEffect } from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { getCategories } from "../../apis/api.js";
import imageAdoracion from "../../assets/categorias/orar.png";

const CardCategoriaOne = ({ filterWrite }) => {
  const [categoria, setCategoria] = useState({});

  useEffect(() => {
  if (!filterWrite) return; // No hacer nada si está vacío

  const fetchSongs = async () => {
    try {
      const categoria = await getCategories();
      const selectCategoria = categoria.find(
        (category) =>
          category.name.trim().toLowerCase() === filterWrite.trim().toLowerCase()
      );
      setCategoria(selectCategoria);
    } catch (error) {
      console.error("Error al obtener las canciones:", error);
    }
  };

  fetchSongs();
}, [filterWrite]); // Ejecuta cuando `filterWrite` cambia




  const handleSelectSong = (song) => {
    navigation.navigate("SongViewId", { songId: song.id });
  };



  console.log("categorias === >", categoria);



  

  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          width: "100%",
          height: 100,
          backgroundColor: "#324879",
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
              height: "100%",
              width: "20%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: "80%", width: "80%" }}
              source={
                categoria?.image_url
                  ? { uri: categoria.image_url }
                  : imageAdoracion
              }
            />
          </View>

          <View style={{ height: "100%", flex: 2 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-around",
                height: "100%",
                paddingHorizontal: 4,
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#ffff" }}>
                {categoria?.name}
              </Text>
              <Text style={{ fontSize: 10, color: "#ffff" }}>
                Reperotrios Worship para tu congregacion
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  color: "#ffff",
                }}
              >
                <Text style={{ fontSize: 10 }}>Misionero</Text>
                <Text style={{ fontSize: 10 }}>Misionero</Text>
                <Text style={{ fontSize: 10 }}>Misionero</Text>
                <Text style={{ fontSize: 10 }}>Misionero</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              height: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#ffff",
                borderRadius: 30,
                height: 65,
                width: 65,
                justifyContent: "center", // centra vertical
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "#072042",
                }}
              >
                +100
              </Text>
              <Text
                style={{
                  fontSize: 8,
                  color: "#d6d6d6",
                }}
              >
                Adoraciones
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
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

export default CardCategoriaOne;
