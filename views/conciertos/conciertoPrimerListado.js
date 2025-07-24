import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import CreateRepertorioSongCat from "./createRepertorySongCat.js";
import { DeletedRepertorioSongCategory } from "../../apis/api.js";

const ConciertoPrimerListado = ({
  categoriasSong,
  repertorioID,
  fetchRepertorios,
  onCardPress,
  reloadRepertorio,
}) => {
  const [openModal9, setOpenModal9] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleCardPress = (id) => {
    setSelectedId(id);
    if (onCardPress) {
      onCardPress(id); // Enviar al padre
    }
  };

  // console.log("nuevo listado",categoriasSong)

  const deletedRepertorioSongCategory = (id) => {
    Alert.alert(
      "¿Eliminar categoría?",
      "Esta acción no se puede deshacer.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              const response = await DeletedRepertorioSongCategory(id);

              if (!response) {
                throw new Error("Error al eliminar");
              }

              console.log("✅ Eliminado con éxito");
              // Aquí puedes actualizar el estado si es necesario
              if (reloadRepertorio) reloadRepertorio();
            } catch (error) {
              console.error("❌ Error al eliminar:", error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const modal = () => (
    <Modal
      visible={openModal9}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setOpenModal9(false)}
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
            width: "90%",
            maxHeight: "80%",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
          }}
        >
          {/* Botón cerrar */}
          <TouchableOpacity
            onPress={() => setOpenModal9(false)}
            style={{ alignSelf: "flex-end", marginBottom: 10 }}
          >
            <AntDesign name="close" size={30} color="black" />
          </TouchableOpacity>

          {/* Cards */}
          <View style={{ flexWrap: "wrap", flexDirection: "row", gap: 10 }}>
            {categoriasSong?.map((x) => (
              <TouchableOpacity
                key={x.id}
                onPress={() => handleCardPress(x.id)}
                style={{
                  backgroundColor: selectedId === x.id ? "#ffa76b" : "#ff7014",
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                  position: "relative",
                  minWidth: "40%",
                }}
              >
                {isEditing && (
                  <View
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      flexDirection: "row",
                      gap: 8,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => console.log("Editar:", x.id)}
                    >
                      <Feather name="edit" size={18} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => deletedRepertorioSongCategory(x.id)}
                    >
                      <AntDesign name="delete" size={18} color="white" />
                    </TouchableOpacity>
                  </View>
                )}
                <Text style={{ color: "white", fontSize: 16 }}>
                  {x.nombre ?? "Sin nombre"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Botones de acción */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              justifyContent: "end",
            }}
          >
            <CreateRepertorioSongCat
              idRepertorio={repertorioID}
              //fetchRepertorios={fetchRepertorios}
              reloadRepertorio={reloadRepertorio}
            />

            <TouchableOpacity
              onPress={() => setIsEditing(!isEditing)}
              style={{
                backgroundColor: "#ccc",
                padding: 8,
                borderRadius: 5,
              }}
            >
              <Text>{isEditing ? "Finalizar edición" : "Editar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={{ flexDirection: "row", paddingHorizontal: 1, width: "100%", alignItems: "center" }}>
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingRight: 2 }}
    style={{ flex: 1 }}
  >
    {categoriasSong?.map((x) => (
      <TouchableOpacity
        key={x.id}
        onPress={() => handleCardPress(x.id)}
        style={{
          backgroundColor: selectedId === x.id ? "#213f69ff" : "#072042",
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 8,
          marginRight: 10,
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          {x.nombre ?? "Sin nombre"}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>

  <TouchableOpacity
    onPress={() => setOpenModal9(true)}
    style={{
      backgroundColor: "#444",
      padding: 10,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      width: 40,
    }}
  >
    <FontAwesome5 name="clone" size={15} color="white" />
  </TouchableOpacity>

  {modal()}
</View>
  );
};

const styles = StyleSheet.create({
  listRow: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
  },
  listBtn: {
    backgroundColor: "#ff7014",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  listBtnText: {
    color: "white",
    fontSize: 14,
  },
});

export default ConciertoPrimerListado;
