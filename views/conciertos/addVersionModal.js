import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { createCustomSong, getCustomSongById } from "../../apis/api.js";

const AddVersionModal = ({
  repertorioID,
  repertorioSongCategoryId,
  customSongID,
}) => {
  const [openModal5, setOpenModal5] = useState(false); //abrir modal para escoger canciones
  const [formData, setFormData] = useState({});
  const [songOriginal, setSongOriginal] = useState({})

  useEffect(() => {
  const fetchCustomSong = async () => {
    try {
      const customSong = await getCustomSongById(customSongID);
      setSongOriginal(customSong);
     // console.log("custom Song ===> ", customSong)
    } catch (error) {
      console.error("Error al obtener el repertorio:", error);
    }
  };

  if (customSongID) {
    fetchCustomSong();
  }
}, [customSongID]);



  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      repertorio_id: repertorioID,
      song_id: songOriginal.original_song_id,
      repertorio_song_category_id: songOriginal.repertorio_song_category_id,
      title: ""
    }));
  }, [songOriginal]);

  const handleCreateRepertorio = async () => {
    try {
      const data = await createCustomSong(formData);
      //console.log("Custom creada", formData);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

 // console.log(formData)

  const modal = () => {
    return (
      <Modal
        visible={openModal5}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setOpenModal5(false)}
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
            {/* Botón de cerrar dentro del contenido */}
            <TouchableOpacity
              onPress={() => setOpenModal5(false)}
              style={{ alignSelf: "flex-end", marginBottom: 10 }}
            >
              <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>

            <View style={styles.container}>
              <View>
                <Text style={styles.title}>Nueva Version</Text>
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="nombre de Version"
                  value={formData.title}
                  onChangeText={(value) =>
                    setFormData({ ...formData, title: value })
                  }
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleCreateRepertorio}
              >
                <Text style={styles.buttonText}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setOpenModal5(true)}
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <FontAwesome5 name="clone" size={15} color="white" />
      </TouchableOpacity>
      {modal()}
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

export default AddVersionModal;
