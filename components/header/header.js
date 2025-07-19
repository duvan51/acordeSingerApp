import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Modal,
  Text,
  backgroundColor,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

import imagenProfile from "../../assets/perfil.png";
import { getUserById } from "../../apis/api";

const Header = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [openModal3, setOpenModal3] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const idUser = await AsyncStorage.getItem("@userId");
        const token = await AsyncStorage.getItem("@userToken");
        //console.log("este es el id usuario", idUser);
        //console.log("este es el token =>  ", token);
        if (idUser && token) {
          const response = await getUserById(idUser, token);
          setData(response);
        }
      } catch (error) {
        console.error("❌", error.message);
      }
    };
    getData();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@userId");
      await AsyncStorage.removeItem("@userToken");
      setData({}); // Limpia el estado local si lo usas
      setOpenModal3(false);
      //navigation.navigate('Login'); // Redirige al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const configUser = () => {
    return (
      <Modal
        visible={openModal3}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setOpenModal3(false)}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              paddingTop: 20,
              paddingHorizontal: 10,
              backgroundColor: "white",
              width: "90%",
              height: "90%",
              borderRadius: 20,
            }}
          >
            {/**estew es el header el aplicativo */}
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                backgroundColor: "#251a4e",
                color: "white",
                borderRadius: 10,
                paddingVertical: 8,
                paddingHorizontal: 2,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "10%",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                onPress={() => setOpenModal3(false)}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "white",
                    borderColor: "white",
                    borderWidth: 1,
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    borderRadius: 40,
                  }}
                >
                  X
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 300, color: "white" }}>
                  MusiKoord
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                width: "100%",
                marginTop: 20,
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#251a4e7c",
                  paddingBottom: 10,
                }}
              >
                <View
                  style={{
                    width: "20%",
                  }}
                >
                  <Image source={imagenProfile} style={styles.profileImage} />
                </View>
                <View
                  style={{
                    width: "80%",
                    paddingLeft: 20,
                  }}
                >
                  <Text>{data.name}</Text>
                  <Text>{data.email}</Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 10,
                  width: "100%",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <View style={{ width: "100%" }}>
                  <TouchableOpacity style={{}}>
                    <Text style={{ fontSize: 14 }}>Configuracion</Text>
                  </TouchableOpacity>
                </View>
              </View>

              
            </View>


            <View style={{ width: "100%" }}>
                <TouchableOpacity onPress={() => logout()} style={{}}>
                  <Text style={{ fontSize: 14 }}>Cerrar Sesion</Text>
                </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {Object.keys(data).length === 0 ? (
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image source={imagenProfile} style={styles.profileImage} />
        </TouchableOpacity>
      ) : data?.profile_picture === null ? (
        <TouchableOpacity onPress={() => setOpenModal3(true)}>
          <Image source={imagenProfile} style={styles.profileImage} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setOpenModal3(true)}>
          <Image source={data?.profile_picture} style={styles.profileImage} />
        </TouchableOpacity>
      )}
      {configUser()}
      <TouchableOpacity onPress={() => navigation.navigate("CreateCategorie")}>
        <FontAwesome name="cogs" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
});

export default Header;
