import React, { useState, useEffect, useCallback  } from "react";
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
import imagenGruppal from "../../assets/imagenGruppal.png";
import Feather from "react-native-vector-icons/Feather";
import { useRoute, useFocusEffect } from "@react-navigation/native";

import {getGroupById} from "../../apis/api"

import Repertorios from "./repertorios/repertorios";
import CreateRepertorio from "./repertorios/createRepertorio";
//Feather



const ViewGroupId = ({ navigation }) => {
  const [text, setText] = useState("");
  const [group, setDataGroup]= useState({});

    const route = useRoute(); 
    const { groupId } = route.params || {};



  const loadData = async() => {
    try {
      const groupData = await getGroupById(groupId); // Esperamos la respuesta
      setDataGroup(groupData); // Guardamos los datos en el estado
    } catch (error) {
      console.error("Error al obtener el grupo:", error);
    }
  };



  useFocusEffect(
    useCallback(() => {
      if (groupId) {
        loadData(groupId);
        console.log("este es el id", groupId )
      }
    }, [groupId])
  );

    

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, gap: 40, width:"100%" }}>
        {/* inicio de cabecera */}
        <View
          style={{
            width: "100%",
            paddingBottom: 20,
            backgroundColor: "white",
          }}
        >
          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "100%",
                height: 150,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image source={imagenGruppal} style={styles.profileImage} />
            </View>

            <View style={{ width: "100%" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center", // centra horizontalmente
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontWeight:'800', fontSize: 20 }}>
                  {group.nombre}
                </Text>
                <Text>{group?.users?.filter(user => user).length || 0} miembros</Text>
              </View>
              <View style={{ width: "100%", marginTop: 20 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    gap: 4,
                    justifyContent: "center",
                  }}
                >
                  {
                    group?.users?.map((x)=>(
                      <View key={x.id} style={{ width: 30, height: 30, borderWidth:2, borderRadius:100 }}>
                        <Image source={x.profile_picture} style={styles.imagenGroups} />
                      </View>
                    ))
                  }
                </View>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                paddingHorizontal: 20,
                marginVertical: 20,
              }}
            >
              <View
                style={{
                  width: "100%",
                  borderTop: 2,
                  borderWidth: 2,
                  borderColor: "gray",
                }}
              ></View>
            </View>

            <View style={{ width: "100%", paddingHorizontal: 20 }}>
              <View style={{ width: "100%", flex: 1, flexDirection: "row" }}>
                <CreateRepertorio groupId={group.id} onRefresh={loadData} />
                <View
                  style={{
                    width: "50%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                </View>
              </View>
            </View>

            
          </View>
        </View>
        {/* fin  de cabecera */}

        {/* inicio de POSTS */}
        <View style={{width:"100%", alignItems: "center"}}>
          {
            group?.repertorios?.map((x)=>(
              <Repertorios key={x.id} data={x} />
            ))
          }
        </View>
        {/* end de POSTS */}


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute"
  },
  imagenGroups: {
    width: "100%",
    height: "100%"
  },
  textArea: {
    height: 120,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top" // importante para multiline
  },
});

export default ViewGroupId;

