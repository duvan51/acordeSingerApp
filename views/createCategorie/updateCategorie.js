import React,{useState, useEffect } from "react";
import axios from "axios"
import { StyleSheet, TextInput,ScrollView, View, Text, Image, Button, Alert} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import {UpdateCategorie} from "../../apis/api.js";

import * as ImagePicker from 'expo-image-picker';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dlkky5xuo/image/upload";
const UPLOAD_PRESET = "TaskMaster"; 



const UpdateCategories = ({ route, navigation }) => {
  const { dataCategoria } = route.params;
    const [formData, setFormData] = useState({
        name: "",
        image: null,
      });
  const [data, setData] = useState({});
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
 


       // Función para seleccionar imagen y subirla
const handleSelectImage = async () => {
  // Solicitar permisos
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.status !== "granted") {
    Alert.alert("Permiso denegado", "Necesitas permitir el acceso a tu galería.");
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



  // actualizar categoria
  const ActualizarCategoria = async () => {
    setLoading(true);
    try {
      const imageUrl = await uploadImageToCloudinary();// Subir imagen primero
      if (!imageUrl) {
        Alert.alert("Error", "No se pudo obtener la URL de la imagen.");
        return;
      }
      const dataToSend = {
        name: formData.name,
        image_url: imageUrl,
      };

      const response = await UpdateCategorie(dataCategoria.id, dataToSend);
      console.log("Categoría Actualizada:", response.data);
      Alert.alert("¡Categoría Actualizada!");
      
      // Limpiar formulario
      setFormData({ name: "", image: null });
      setImageUri(null);
      setUploadedImageUrl(null);

      
      navigation.goBack(); 
 

    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      Alert.alert("Error", "Hubo un problema al actualizar categoria.");
    } finally {
      setLoading(false);
    }
  };




  return (
    <ScrollView style={styles.container}>
      <SafeAreaProvider >
        <SafeAreaView style={{
                marginBottom:10
                }} >
          <View style={{ 
                flexDirection: "row", 
                width:"100%", 
                marginVertical:30, 
                borderRadius:10,
                paddingVertical:5, 
                paddingHorizontal:10, 
                backgroundColor: "white"
                }} >
            <View style={{ width:"50%", justifyContent: "center" }}>
                <Text style={{fontSize: 25, fontWeight: "600"}}>
                    {dataCategoria.name}
                </Text>
            </View>
            <View style={{ width:"50%", height:100,  }} >
                    <Image
                        source={{ uri: dataCategoria.image_url }}
                        style={styles.image}
                        resizeMode="contain"
                    />
    
            </View>
          </View>
        </SafeAreaView>


        <SafeAreaView style={{
                marginBottom:10
                }} >
            
            <View style={{
                flexDirection: "row", 
                }}> 
                <View style={{
                width:"70%" 
                }}>
                    <TextInput
                        style={styles.input}
                        value={formData.name}
                        placeholder="Nombre Categoria"
                        onChangeText={(value) => setFormData({ ...formData, name: value })}
                    />
                </View>
                <View style={{
                width:"30%",
                justifyContent: "center"
                }}>
                    <Button 
                        title="Seleccionar imagen" 
                        onPress={handleSelectImage}
                        style={styles.button}
                    />
                </View>
            </View>

          <View style={{ 
                flexDirection: "row", 
                width:"100%", 
                marginVertical:30, 
                borderRadius:10,
                paddingVertical:5, 
                paddingHorizontal:10, 
                backgroundColor: "white"
                }} >
            <View style={{ width:"50%", justifyContent: "center" }}>
                <Text style={{fontSize: 25, fontWeight: "600"}}>{dataCategoria.name}</Text>
            </View>
            <View style={{ width:"50%", height:100,  }} >
                {imageUri ? (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                ):(
                    <Image
                        source={{ uri: dataCategoria.image_url }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
            </View>
          </View>
          <View>
            <Button title="Actualizar categoria" onPress={ActualizarCategoria} />
          </View>

        </SafeAreaView>
      </SafeAreaProvider>
    

       

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container:{
    
    flex:1,
    paddingHorizontal:10
  },
  button:{
    borderRadius: 10,
    backgroundColor: "white"
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
    backgroundColor: "white"
  },
  
  textInput: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    
  },
});

export default UpdateCategories;
