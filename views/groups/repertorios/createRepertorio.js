import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import ModalSearchingSong from "../../../components/ModalSearchingSongs/ModalSearchingSongs.js";

import DatePickerExpo from "../../../components/InputCalendario/inputCalendario.js";

import {getGroupById, createRepertorio} from "../../../apis/api"

const CreateRepertorio = ({groupId,  onRefresh}) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
   const [openModal, setOpenModal] = useState(false);

    const [formData, setFormData] = useState({
       nombre: "",
       group_id: 0,
       fecha: null
     });

     useEffect(() => {
      setFormData((prev) => ({
        ...prev,
        fecha: fechaSeleccionada,
        group_id: groupId,
      }));
    }, [fechaSeleccionada, groupId]);



    const handleCreateRepertorio = async () => {
        try {
          const data = await  createRepertorio(formData);
          //console.log("Repetrtorio Creado:", data);
          setTimeout(() => {
            if (onRefresh) onRefresh(); // Llama la función del padre para recargar datos
            setOpenModal(false);
          }, 500);
         setFormData({ ...formData, nombre: "", group_id: 0, fecha: null });
        } catch (error) {
          console.error(error.response?.data || error.message);
          Alert.alert("Error", "Algo salio mal");
        }
      };
    

     

     


    const CreateRepertory = () => {
    return (
      <Modal
        visible={openModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setOpenModal(false)}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <TouchableOpacity
            onPress={() => setOpenModal(false)}
            style={{ width: "100%", justifyContent: "center" }}
          >
            <AntDesign name="close" size={30} color="white" />
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              height: "70%",
              backgroundColor: "white",
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderTopEndRadius: 20,
              borderTopStartRadius: 20,
            }}
          >
            <View style={styles.container}>
              <View>
                <Text style={styles.title}>Nuevo Repertorio</Text>
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="nombre repertorio"
                  value={formData.nombre}
                  onChangeText={(value) =>
                    setFormData({ ...formData, nombre: value })
                  }
                />
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    marginBottom: 12,
                    borderRadius: 6,
                  }}
                >
                  <TextInput
                    underlineColorAndroid="transparent"
                    style={{
                      borderBottomWidth: 1,
                      borderColor: "#ccc",
                      padding: 5,
                    }}
                    placeholder="Correo"
                    value={ ""}
                    onChangeText={""}
                  />
                  <View
                    style={{
                      paddingVertical: 4,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                      gap: 2,
                      height: "auto",
                      maxWidth: "100%",
                    }}
                  >
                    <DatePickerExpo onChangeDate={(fecha) => setFechaSeleccionada(fecha.toISOString().split("T")[0])} />
                  </View>
                  <View
                    style={{
                      paddingVertical: 4,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                      gap: 2,
                      height: "auto",
                      maxWidth: "100%",
                    }}
                  >
                    {/** <ModalSearchingSong />  */}
                    
                    
                  </View>
                </View>

                
              </View>
              <TouchableOpacity style={styles.button} onPress={handleCreateRepertorio}>
                <Text style={styles.buttonText}>Crear Repertorio</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setOpenModal(true)}
        style={{
          width: "50%",
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Feather name="edit" size={30} color="black" />
        <Text>Post</Text>
      </TouchableOpacity>
      {CreateRepertory()}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "800",
      marginBottom: 20,
      textAlign: "center",
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginBottom: 12,
      borderRadius: 6,
    },
    button: {
      backgroundColor: "#007AFF",
      padding: 12,
      borderRadius: 6,
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "800",
    },
  });
  

export default CreateRepertorio;
