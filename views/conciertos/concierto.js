import React, { use, useEffect, useState } from "react";
import {
  createRepertorio,
  getRepertorioSongCategoryId,
  createCustomSong,
  getRepertorioId,
} from "../../apis/api.js";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ConciertoSong from "./conciertoSong.js";
import CreateRepertorioSongCat from "./createRepertorySongCat.js";
import ModalSearchingSong from "../../components/ModalSearchingSongs/ModalSearchingSongs.js";
import AddVersionModal from "./addVersionModal.js";
import EditCustomSong from "./editCustomSong.js";
import NameOriginal from "./nameSongOriginal.js";
import ConciertoPrimerListado from "./conciertoPrimerListado.js";

const ConviertoSongViewId = ({ navigation }) => {
  const route = useRoute();
  const [repertorySongCategoryId, setRepertorySongCategoryId] = useState(0);
  const [dataCustomSong, setDataCustomSong] = useState([]);
  const [versionesCustomSong, setVersionesCustomSong] = useState([]);
  const [songCustomId, setSongCustomId] = useState(0);

  const [formData, setFormData] = useState({});
  const [repertorioIdSong, setIdRepertorioSong] = useState(0);
  const [songRecibida, setSongRecibida] = useState(0);

  const [selectFirstList, setFirstList] = useState(null);
  const [selectSecondtList, setSecondtList] = useState(null);
  const [selectThreeList, setThreeList] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const [repertorio, setRepertorio] = useState({});

  const { idRepertorio } = route.params || 0;

  useEffect(() => {
    reloadRepertorio();
  }, []);

  const reloadRepertorio = async () => {
    try {
      const data = await getRepertorioId(idRepertorio);
      setRepertorio(data);
    } catch (error) {
      console.error("Error al recargar repertorio:", error);
    }
  };

  const fetchRepertorios = async (id) => {
    try {
      const customSong = await getRepertorioSongCategoryId(id);
      setDataCustomSong(customSong);
      //console.log("Custom Song ===> ", customSong);
    } catch (error) {
      console.error("Error al obtener el repertorio:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await reloadRepertorio();
    setRefreshing(false);
  };

  useEffect(() => {
    if (
      typeof repertorySongCategoryId === "number" &&
      repertorySongCategoryId !== 0
    ) {
      fetchRepertorios(repertorySongCategoryId);
      setIdRepertorioSong(repertorySongCategoryId);
    } else if (
      repertorio?.repertorio_song_category?.length > 0 &&
      repertorio.repertorio_song_category[0]?.id &&
      repertorio.repertorio_song_category[0].id !== 0
    ) {
      const idRepertorioSong = repertorio.repertorio_song_category[0].id;
      fetchRepertorios(idRepertorioSong);
      setIdRepertorioSong(idRepertorioSong);
    }
  }, [repertorySongCategoryId, repertorio]);

  useEffect(() => {
    if (
      dataCustomSong?.custom_songs &&
      Array.isArray(dataCustomSong.custom_songs) &&
      dataCustomSong.custom_songs.length > 0
    ) {
      // Primer listado
      if (repertorio?.repertorio_song_category?.length > 0) {
        setFirstList(repertorio.repertorio_song_category[0].id);
      }
      // Segundo listado
      setSecondtList(dataCustomSong.custom_songs[0].original_song_id);

      // Tercer listado
      const firstVersion = dataCustomSong.custom_songs[0].versiones?.[0];
      if (firstVersion) {
        setThreeList(firstVersion.id);
        setSongCustomId(firstVersion.id);
        setVersionesCustomSong(dataCustomSong.custom_songs[0].versiones);
      } else {
        setThreeList(null);
        setSongCustomId(0);
        setVersionesCustomSong([]);
      }
    } else {
      setFirstList(null);
      setSecondtList(null);
      setThreeList(null);
      setSongCustomId(0);
      setVersionesCustomSong([]);
    }
  }, [dataCustomSong, repertorio]);

  const handlSongOfModal = (songSelectId) => {
    setSongRecibida(songSelectId);
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      repertorio_id: repertorio?.id ?? 0,
      song_id:
        Array.isArray(songRecibida) && songRecibida[0]?.id
          ? songRecibida[0].id
          : 0,
      repertorio_song_category_id: repertorioIdSong,
    }));
  }, [songRecibida]);

  useEffect(() => {
    if (
      formData.song_id &&
      formData.repertorio_id &&
      formData.repertorio_song_category_id
    ) {
      handleCreateSong();
      //console.log("vamos a crear el custom")
    }
  }, [formData]);

  const handleCreateSong = async () => {
    try {
      await createCustomSong(formData);
      Alert.alert("Agregado correctamente");
      fetchRepertorios(repertorioIdSong);
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert("Error", "al agregar la cancion");
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerBackBtn}
            >
              <FontAwesome name="arrow-left" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>
                {repertorio?.nombre ?? "Sin nombre"}
              </Text>
              <Text style={styles.headerDate}>{repertorio?.fecha ?? ""}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <FontAwesome name="plus" size={15} color="black" />
            <FontAwesome name="minus" size={15} color="black" />
          </View>
        </View>

        <View style={{ width: "100%" }}>
          {/* Primer listado */}
          <View style={styles.listBar}>
            <ConciertoPrimerListado
              categoriasSong={repertorio?.repertorio_song_category}
              onCardPress={(id) =>
                setRepertorySongCategoryId(id) && setFirstList(id)
              }
              repertorioID={repertorio?.id ?? 0}
              //fetchRepertorios={fetchRepertorios}
              reloadRepertorio={reloadRepertorio}
            />
          </View>

          
{/* Segundo listado */}
<View style={styles.listBarWhite}>
  <View style={[styles.listRow, { flex: 1, flexDirection: "row", alignItems: "center" }]}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: "row", alignItems: "center" }}
      style={{ flex: 1 }}
    >
      {dataCustomSong?.custom_songs?.map((z) => (
        <TouchableOpacity
          key={z.original_song_id}
          onPress={() => {
            setVersionesCustomSong(z?.versiones ?? []);
            setSecondtList(z.original_song_id);
          }}
          style={[
            styles.listBtnWhite,
            selectSecondtList === z.original_song_id &&
              styles.listBtnWhiteActive,
          ]}
        >
          <Text
            style={[
              styles.listBtnWhiteText,
              selectSecondtList === z.original_song_id &&
                styles.listBtnWhiteTextActive,
            ]}
          >
            <NameOriginal x={z.original_song_id} />
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    {/* Botón fuera del Scroll pero en la misma línea */}
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.listBtnWhite, { marginLeft: 10 }]}
    >
      <ModalSearchingSong songSelect={handlSongOfModal} />
    </TouchableOpacity>
  </View>
</View>





          {/* Tercer listado */}
          <View style={{ padding: 10, width: "100%" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {versionesCustomSong?.map((custSong) => (
                  <TouchableOpacity
                    key={custSong.id}
                    onPress={() => {
                      setSongCustomId(custSong.id);
                      setThreeList(custSong.id);
                    }}
                    style={{
                      backgroundColor:
                        selectThreeList === custSong.id
                          ? "#213f69ff"
                          : "#072042",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 8,
                      marginRight: 10,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                      }}
                    >
                      {custSong.title ?? ""}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Botón de agregar versión, fuera del scroll */}
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  backgroundColor: "#444",
                  borderRadius: 8,
                  justifyContent: "center",
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginLeft: 10,
                }}
              >
                <AddVersionModal
                  repertorioID={repertorio?.id ?? 0}
                  repertorioSongCategoryId={repertorioIdSong}
                  customSongID={songCustomId}
                  fetchRepertorios={fetchRepertorios}
                />
              </TouchableOpacity>
            </View>
          </View>

          <EditCustomSong
            customSongId={songCustomId}
            onDeleted={(idEliminado) => {
              setSongCustomId(0);
              fetchRepertorios(repertorioIdSong);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#F5F5F5" },
  header: {
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(216, 216, 216)",
    paddingBottom: 6,
    height: 60,
    alignItems: "center",
  },
  headerLeft: { flex: 1, flexDirection: "row", width: "70%" },
  headerBackBtn: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: { width: "70%" },
  headerTitle: { fontSize: 16, fontWeight: "bold" },
  headerDate: { fontSize: 14, color: "#888" },
  headerRight: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  listBar: {
    width: "100%",
    backgroundColor: "#072042",
    paddingHorizontal: 20,
    height: 40,
  },
  listBarWhite: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    height: 30,
  },
  listBarSmall: {
    width: "100%",
    backgroundColor: "#072042",
    paddingHorizontal: 20,
    height: 30,
  },
  listRow: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listBtn: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#072042",
    paddingHorizontal: 5,
  },
  listBtnActive: {
    backgroundColor: "#1b3454",
  },
  listBtnText: {
    color: "white",
    borderRadius: 1,
    borderBottomColor: "#072042",
    fontWeight: "100",
    borderBottomWidth: 2,
    padding: 5,
    fontSize: 14,
  },
  listBtnTextActive: {
    borderBottomColor: "white",
    fontWeight: "600",
  },
  listBtnWhite: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 5,
  },
  listBtnWhiteActive: {
    backgroundColor: "#dbdbdb",
  },
  listBtnWhiteText: {
    color: "#000",
    borderRadius: 1,
    borderBottomColor: "white",
    fontWeight: "100",
    borderBottomWidth: 2,
    padding: 5,
    fontSize: 14,
  },
  listBtnWhiteTextActive: {
    borderBottomColor: "#072042",
    fontWeight: "600",
  },
});
export default ConviertoSongViewId;
