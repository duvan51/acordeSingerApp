import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  Alert,
  TouchableOpacity
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { getCategories, createCategorie } from "../../apis/api.js";
import imageP from "../../assets/espiritu-santo.png";
import imageBase from "../../assets/correccion-de-imagen.png";
import * as ImagePicker from "expo-image-picker";

import AntDesign from 'react-native-vector-icons/AntDesign';





const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlkky5xuo/image/upload";
const UPLOAD_PRESET = "TaskMaster";

const CreateCategorie = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const [data, setData] = useState({});
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [reload, setReload] = useState(false);




  //aqui obtengo las categorias
  const fetchCategorias = async () => {
    try {
      const data = await getCategories(); // Esperamos la respuesta
      setData(data); // Guardamos los datos en el estado
    } catch (error) {
      console.error("Error al obtener las canciones:", error);
    }
  };
  //aqui llamo la funcion de obtener categorias
  useFocusEffect(
    useCallback(() => {
      fetchCategorias();
  }, []));



  // Función para seleccionar imagen y subirla
  const handleSelectImage = async () => {
    // Solicitar permisos
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Necesitas permitir el acceso a tu galería."
      );
      return;
    }

    // Abrir la galería
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Si se cancela
    if (result.canceled) {
      console.log("Selección cancelada");
      return;
    }

    const uri = result.assets[0].uri;
    setImageUri(uri); // Guarda la imagen localmente
  };

  // Subir imagen a Cloudinary
  const uploadImageToCloudinary = async () => {
    if (!imageUri) return null;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", imageUri);
      formData.append("upload_preset", "singerApi");

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dlkky5xuo/image/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Imagen subida:", data.secure_url);
      setUploadedImageUrl(data.secure_url);

      return data.secure_url;
    } catch (error) {
      console.error("Error al subir imagen:", error);
      Alert.alert("Error", "Hubo un problema al subir la imagen.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Guardar categoría en el backend
  const GuardarCategoria = async () => {
    if (!formData.name) {
      Alert.alert("Error", "El nombre de la categoría es obligatorio.");
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImageToCloudinary(); // Subir imagen primero

      console.log("url===>", imageUrl);
      if (!imageUrl) {
        Alert.alert("Error", "No se pudo obtener la URL de la imagen.");
        return;
      }
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("image_url", imageUrl); // Usar la URL subida

      const response = await createCategorie(dataToSend);
      console.log("Categoría creada:", response.data);
      Alert.alert("¡Categoría creada exitosamente!");

      // Limpiar formulario
      setFormData({ name: "", image: null });
      setImageUri(null);
      setUploadedImageUrl(null);
      
      await fetchCategorias();

    } catch (error) {
      console.error("Error al crear categoría:", error);
      Alert.alert("Error", "Hubo un problema al crear la categoría.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView
          style={{
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "70%",
              }}
            >
              <TextInput
                style={styles.input}
                value={formData.name}
                placeholder="Nombre Categoria"
                onChangeText={(value) =>
                  setFormData({ ...formData, name: value })
                }
              />
            </View>
            <View
              style={{
                width: "30%",
                justifyContent: "center",
              }}
            >
              <Button
                title="Seleccionar imagen"
                onPress={handleSelectImage}
                style={styles.button}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginVertical: 30,
              borderRadius: 10,
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: "white",
            }}
          >
            <View style={{ width: "50%", justifyContent: "center" }}>
              <Text style={{ fontSize: 25, fontWeight: "600" }}>Adoracion</Text>
            </View>
            <View style={{ width: "50%", height: 100 }}>
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={imageBase}
                  style={styles.image}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
          <View>
            <Button title="Crear Categoria" onPress={GuardarCategoria} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>

      <View style={{ marginTop: 10 }}>
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
              <View
                key={x.id}
                style={{
                  fontSize: 17,
                  width: "48%",
                  height: 60,
                  backgroundColor: "#FFFF",
                  borderRadius: 10,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    paddingVertical: 2,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    height: "100%",
                    flexWrap: "wrap",
                  }}
                >
                  <View style={{ flex: 1, rowGap:3 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#2196F3",
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 5,
                      }}
                      onPress={() => navigation.navigate(('UpdateCategorie'),  { dataCategoria : x})}
                    >
                      <AntDesign name="edit" size={10} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        backgroundColor: "#f44336",
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        borderRadius: 5,
                      }}
                      onPress={() => console.log("Delete pressed")}
                    >
                      <AntDesign name="delete" size={10} color="black" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      height: "100%",
                      justifyContent: "center",
                      fontWeight: "300",
                      paddingLeft:6
                    }}
                  >
                    <Text>{x.name}</Text>
                  </View>
                  <View style={{ flex: 2, height: "100%" }}>
                    {x.image_url ? (
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{ uri: x.image_url }}
                      />
                    ) : (
                      <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{ uri: imageBase }}
                      />
                    )}
                  </View>

                </View>
              </View>
            ))
          ) : (
            <Text>Cargando o sin datos...</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "white",
  },
  containerText: {
    borderBottomColor: "#000",
    borderWidth: 1,
    margin: 12,
    borderRadius: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },

  textInput: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default CreateCategorie;
