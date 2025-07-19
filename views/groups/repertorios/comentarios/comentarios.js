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
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {createComentarios} from "../../../../apis/api"
import AsyncStorage from '@react-native-async-storage/async-storage';




const Comentarios = ({comentarios, idRepertorio, onComentarioGuardado}) => {
    const [formData, setFormData] = useState({
        contenido: "",
        user_id:"",
        repertorio_id: ""
        
    });

        const GuardarComentario = async () => {
            if (!formData.contenido) {
                console.log("Error", "El nombre de la categoría es obligatorio.");
                return;
            }
    

            const idUser = await AsyncStorage.getItem('@userId');
            
            const dataToSend = new FormData();
            dataToSend.append("contenido", formData.contenido);
            dataToSend.append("user_id", idUser);
            dataToSend.append("repertorio_id", idRepertorio);


            try {
              const response = await createComentarios(dataToSend);
              console.log("Comentario creado:", response.data); 
              onComentarioGuardado(); //recargar los comentarios

              setFormData({ ...formData, contenido: "" }); // Limpiar input
  
          } catch (error) {
              console.error("Error al guardar comentario:", error);
          }
       
        }
    
        const hora = (fecha)=>{
          dayjs.extend(relativeTime);
          return dayjs(fecha).fromNow();
        }



  return (
    <View style={{ marginTop: 40 }}>
        <View style={{}}>
            {
            comentarios?.map((coment)=>(
                <View style={{ width: "100%", marginBottom:10 }} key={coment.id}>
                    <View style={{ flex: 1, flexDirection: "row",  columnGap:3 }}>
                      <View style={{ width: "10%" }}>
                            <View  style={{ width: 30, height: 30, borderWidth:2, borderRadius:100 }}>
                                <Image source={coment.user.profile_picture} style={styles.imagenGroups} />
                            </View>
                      </View>
                      <View style={{ width: "90%" }}>
                            <View>
                                <Text style={{ fontWeight:'500' }}>
                                    {coment.user.name}
                                </Text>
                            </View>
                            <View>
                                <Text>
                                    {coment.contenido}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ fontWeight:'100', fontSize:10 }}>
                                    {hora(coment.created_at)}
                                </Text>
                            </View>
                      </View>
                    </View>
                    
                  </View>
                ))
            }
            </View>
                  <View style={{ paddingTop: 10 }}>
                    <View style={{ width: "100%", flex: 1, gap: 2 }}>
                      <TextInput
                        style={styles.textArea}
                        placeholder="Escribe tu comentario aquí..."
                        multiline={true}
                        numberOfLines={4}
                        value={formData.contenido}
                        onChangeText={(value) =>
                            setFormData({ ...formData, contenido: value })
                          }
                      />
                      <View style={{ width: "100%", alignItems: "flex-end" }}>
                        <View
                          style={{
                            width: 80,
                            height: 30,
                            backgroundColor: "#ff7014",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 5,
                          }}
                        >

                          <Button 
                            title="Publicar" 
                            style={{ color: "white" }} 
                            onPress={GuardarComentario} 
                          />
                        </View>
                      </View>
                    </View>
                  </View>
        </View>
  )
}


const styles = StyleSheet.create({
    textArea: {
      height: 120,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      textAlignVertical: "top", // importante para multiline
    },
    imagenGroups: {
        width: "100%",
        height: "100%",
    }
  });

export default Comentarios;