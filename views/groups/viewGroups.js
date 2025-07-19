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
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createGroups, getUserById } from "../../apis/api";

const ViewGroups = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [inputEmail, setInputEmails] = useState("");
  const [emails, setEmails] = useState([]);
  const [dataGroups, setDataGroups] = useState([]);

  const [fechaActual] = useState(() => {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, "0"); // Mes comienza desde 0
    const day = String(hoy.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  });

  const [formData, setFormData] = useState({
    nombre: "",
    fecha: "",
    user_id: 0,
    members: [],
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      members: emails,
      user_id: userId,
      fecha: fechaActual,
    }));
  }, [emails, userId, fechaActual]);

  const CreateGroups = async () => {
    try {
      const data = await createGroups(formData);
     // console.log("✅ Token:", data);
      setOpenModal(false);
      setEmails([]);
      setFormData({ ...formData, nombre: "", profile_picture: "" });
      // Aquí puedes guardar token o navegar
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert("Error", "Credenciales incorrectas");
    }
  };

  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem("@userId");
      const token = await AsyncStorage.getItem("@userToken");
      if (id) {
        setUserId(id);
        const dataUser = await getUserById(id, token);
        setDataGroups(dataUser.groups);
        /*console.log("esto es la data del user=>", dataUser) */
      }
    };
    getUserId();
  }, []);

  //aqui vamos a agregar los correos al estado
  const handleEmails = (text) => {
    if (text.endsWith(" ") || text.endsWith("\n")) {
      const palabra = text.trim();
      if (palabra.length > 0) {
        setEmails((prev) => [...prev, palabra]); // Agrega al array
      }
      setInputEmails("");
    } else {
      setInputEmails(text);
    }
  };



  
  const CreateGroup = () => {
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
              height: "50%",
              backgroundColor: "white",
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderTopEndRadius: 20,
              borderTopStartRadius: 20,
            }}
          >
            <View style={styles.container}>
              <View>
                <Text style={styles.title}>Crear Grupo</Text>
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="nombre"
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
                    value={inputEmail}
                    onChangeText={handleEmails}
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
                    {emails.map((x) => (
                      <View
                        key={x}
                        style={{
                          borderWidth: 1,
                          borderColor: "#ccc",
                          borderRadius: 6,
                          paddingVertical: 2,
                          paddingHorizontal: 2,
                          flexDirection: "row",
                          gap: 2,
                        }}
                      >
                        <Text style={{ fontSize: 12 }}>{x}</Text>
                        <View
                          style={{
                            borderRadius: 100,
                            backgroundColor: "red",
                            width: 15,
                            height: 15,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 10,
                              color: "white",
                              lineHeight: 15,
                              textAlign: "center",
                            }}
                          >
                            X
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Image perfil"
                  onChangeText={(value) =>
                    setFormData({ ...formData, profile_picture: value })
                  }
                  value={formData.profile_picture}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={CreateGroups}>
                <Text style={styles.buttonText}>Crear Grupo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  //console.log("este es el groups", dataGroups)

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
      <View style={{ width: "100%" }}>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "white",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text>Grupos</Text>
          </View>
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <AntDesign name="addusergroup" size={30} color="black" />
          </TouchableOpacity>
          {CreateGroup()}
        </View>

        <View style={{ flex: 1, flexDirection: "column", gap: 20 }}>
          
          {dataGroups.map((x) => (
            <TouchableOpacity
              key={x.id}
              style={{
                backgroundColor: "white",
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
              onPress={() =>
                navigation.navigate("ViewGroupId", { groupId: x.id })
              }
            >
              <View>
                <View style={{ paddingBottom: 20 }}>
                  <Text style={{ fontWeight: "800", fontSize: 20 }}>
                    {x.nombre}
                  </Text>
                </View>

                <View style={{ flex: 1, flexDirection: "column" }}>
                  {/* Tarjeta 1 */}
                  {x?.repertorios?.map((repertorio)=>(
                   // console.log(repertorio),
                    <View
                    key={repertorio.id}
                    style={{
                      backgroundColor: "#f2f2f2",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 10,
                      marginBottom: 10,
                    }}
                  >
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <Text style={{ fontWeight: "800" }}>
                            {repertorio.nombre}
                          </Text>
                          <Text>{repertorio.fecha}</Text>
                        </View>
                        <View>
                          <Ionicons
                            name="notifications"
                            size={30}
                            color="black"
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          width: "100%",
                          borderBottomWidth: 2,
                          borderColor: "white",
                          marginVertical: 10,
                        }}
                      />

                      <View style={{ width: "100%" }}>
                        <View style={{ marginBottom: 2 }}>
                          <Text style={{ fontSize: 10 }}>
                            Kevin ha publicado
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 10 }}>
                            dumar ha grabado un audio
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          marginTop: 5,
                        }}
                      >
                        <AntDesign
                          name="clockcircleo"
                          size={15}
                          color="black"
                        />
                        <Text style={{ fontSize: 10, marginLeft: 5 }}>
                          faltan 3 días
                        </Text>
                      </View>
                    </View>
                  </View>

                  ))}
                  {/* Tarjeta 2 */}
                  <View
                    style={{
                      backgroundColor: "#f2f2f2",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderRadius: 10,
                    }}
                  >
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          width: "100%",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <Text style={{ fontWeight: "800" }}>
                            Concierto hiuston
                          </Text>
                          <Text>12/08/2024</Text>
                        </View>
                        <View>
                          <Ionicons
                            name="notifications"
                            size={30}
                            color="black"
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          width: "100%",
                          borderBottomWidth: 2,
                          borderColor: "white",
                          marginVertical: 10,
                        }}
                      />

                      <View style={{ width: "100%" }}>
                        <View style={{ marginBottom: 2 }}>
                          <Text style={{ fontSize: 10 }}>
                            Kevin ha publicado
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 10 }}>
                            dumar ha grabado un audio
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          marginTop: 5,
                        }}
                      >
                        <AntDesign
                          name="clockcircleo"
                          size={15}
                          color="black"
                        />
                        <Text style={{ fontSize: 10, marginLeft: 5 }}>
                          faltan 3 días
                        </Text>
                      </View>
                    </View>
                  </View>

                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
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

export default ViewGroups;
