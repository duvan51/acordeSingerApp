import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import SearchInput from "../../components/input/searchInput";
import { useNavigation } from "@react-navigation/native";

import { getCategories } from "../../apis/api.js";

import imageP from "../../assets/espiritu-santo.png";

const SearchingFilter = () => {
  const [data, setData] = useState({});
  const navigation = useNavigation();

  const [category, setCategory] = useState("")
  

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const songs = await getCategories(); // Esperamos la respuesta
        setData(songs); // Guardamos los datos en el estado
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    };

    fetchCategorias();
  }, []);


  //console.log(category)

  return (
    <View style={{ fontSize: 17, paddingTop: 20, paddingHorizontal: 10 }}>
      
      <TouchableOpacity onPress={() => navigation.navigate("SearchingLive", { categoryProp: category })}>
        <SearchInput isDisabled={true}  />
      </TouchableOpacity>

      {/**categorias */}
      <View>
        <Text style={{ fontSize: 17, fontWeight: "800", paddingBottom: 5 }}>
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
                  paddingVertical:2,
                  marginBottom: 10
                }}
                
                onPress={() => navigation.navigate("SearchingList", { query: x.name })}
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
                  <View style={{ width: "30%", height:"100%" }}>
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
      </View>
    </View>
  );
};

export default SearchingFilter;
