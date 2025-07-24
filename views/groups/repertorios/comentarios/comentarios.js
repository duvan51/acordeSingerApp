import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { createComentarios } from "../../../../apis/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Comentarios = ({ comentarios, idRepertorio, onComentarioGuardado }) => {
  const [formData, setFormData] = useState({
    contenido: "",
  });

  const GuardarComentario = async () => {
    if (!formData.contenido) {
      console.log("Error", "El contenido del comentario es obligatorio.");
      return;
    }

    try {
      const idUser = await AsyncStorage.getItem("@userId");

      // ✅ Envía JSON plano
      const dataToSend = {
        contenido: formData.contenido,
        user_id: idUser,
        repertorio_id: idRepertorio,
      };

      const response = await createComentarios(dataToSend);

      console.log("Comentario creado:", response.data);
      onComentarioGuardado(); // Recargar comentarios
      setFormData({ contenido: "" }); // Limpiar input
    } catch (error) {
      console.error("Error al guardar comentario:", error);
    }
  };

  const hora = (fecha) => {
    dayjs.extend(relativeTime);
    return dayjs(fecha).fromNow();
  };

  return (
    <View style={{ marginTop: 40 }}>
      <View>
        {comentarios?.map((coment) => (
          <View key={coment.id} style={{ width: "100%", marginBottom: 10 }}>
            <View style={{ flexDirection: "row", columnGap: 3 }}>
              <View style={{ width: "10%" }}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderWidth: 2,
                    borderRadius: 100,
                  }}
                >
                  <Image
                    source={coment.user.profile_picture}
                    style={styles.imagenGroups}
                  />
                </View>
              </View>
              <View style={{ width: "90%" }}>
                <Text style={{ fontWeight: "500" }}>{coment.user.name}</Text>
                <Text>{coment.contenido}</Text>
                <Text style={{ fontWeight: "100", fontSize: 10 }}>
                  {hora(coment.created_at)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={{ paddingTop: 10, paddingBottom: 20 }}>
        <View style={{ width: "100%", gap: 2 }}>
          <TextInput
            style={styles.textArea}
            placeholder="Escribe tu comentario aquí..."
            placeholderTextColor="#888"
            multiline
            numberOfLines={4}
            value={formData.contenido}
            onChangeText={(value) =>
              setFormData({ ...formData, contenido: value })
            }
          />
          <View
            style={{ width: "100%", alignItems: "flex-end", marginTop: 10 }}
          >
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.button}
                onPress={GuardarComentario}
              >
                <Text style={styles.buttonText}>Publicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textArea: {
    height: 120,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
  },
  imagenGroups: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#072042",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Comentarios;
