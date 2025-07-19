import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../components/header/header.js";
import CardSongOne from "../components/cardsSongs/cardSongOne.js";
import CardCategoriaOne from "../components/cardCategorias/cardCategoriaOne.js";
import { LinearGradient } from "expo-linear-gradient";
import NuevosRepertorios from "../components/cardsNuevosRepertorios/nuevosRepertorios.js";

import Azul from "../assets/azul.png";
import Blanco from "../assets/blanco.png";
import Naranja from "../assets/naranja.png";
import Rojo from "../assets/rojo.png";


const url = "https://api.wit.ai/speech";
const image1 = require("../assets/selecSong.jpeg");
const image2 = require("../assets/writingSong.jpeg");

export default function Home({ navigation }) {




  return (
    <LinearGradient
      colors={["#251a4e", "#100929"]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
          }}
        >
          {/* Header dentro del Scroll */}
          <View style={{ width: "100%", paddingBottom: 20 }}>
            <Header />
          </View>

          <View style={{ width: "100%", paddingHorizontal: 20 }}>
            <View
              style={{
                backgroundColor: "#1c1b4b",
                borderRadius: 10,
                paddingHorizontal: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#ffffff", fontSize: 35, fontWeight: 600 }}>
                M u s i k o o r d
              </Text>
            </View>
          </View>

          {/* Sección nuevos repertorios */}
          <View style={{ paddingVertical: 40, height: 220 }}>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={{ color: "#ffffff" }}>Repertorios</Text>
            </View>
            <NuevosRepertorios />
          </View>

          {/* Sección de imágenes */}
          <View>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={{ color: "#ffffff" }}>Opciones</Text>
            </View>
            <View style={styles.section}>
              {[
                {
                  screen: "SearchingSongs",
                  image: Azul,
                  title: "ENSAYA",
                  description: "Musikoord te ayuda a organizar",
                  rotate: 4,
                  color: "#024583",
                },
                {
                  screen: "CreateSong",
                  image: Blanco,
                  title: "CREA",
                  description: "Repertorios unicos",
                  rotate: -4,
                  color: "#0f0f0f",
                },
                {
                  screen: "CreateElements",
                  image: Naranja,
                  title: "INSPIRATE",
                  description: "Musikoord hace el resto",
                  rotate: -4,
                  color: "#ff7014",
                },
                {
                  screen: "CreateSongWrite",
                  image: Rojo,
                  title: "ESCRIBE",
                  description: "Tus propias versiones",
                  rotate: 4,
                  color: "#ff0000",
                },
              ].map((item, index) => (
                <View style={styles.child} key={index}>
                  <TouchableOpacity
                    style={styles.image}
                    onPress={() => navigation.navigate(item.screen)}
                  >
                    <View
                      style={{
                        backgroundColor: `${item.color}`,
                        width: 160,
                        height: 170,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          marginBottom: 20,
                          alignItems: "center",
                          paddingTop: 15,
                        }}
                      >
                        <Text style={{ color: "#ffff", fontWeight: 600 }}>
                          {item.title}
                        </Text>
                        <Text style={{ color: "#ffff", fontSize: 10 }}>
                          {item.description}
                        </Text>
                      </View>

                      <Image
                        source={`${item.image}`}
                        style={{
                          width: 140,
                          height: 120,
                          transform: [{ rotate: `${item.rotate}deg` }],
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Lista de canciones */}
          <View style={{ marginTop: 20, width: "100%", paddingHorizontal: 20 }}>
            <CardSongOne />
            <CardSongOne />
            <CardSongOne />
          </View>

          <View style={{ marginTop: 20, width: "100%" }}>
            <View>
              <View style={{ paddingHorizontal: 10 }}>
              <Text style={{ color: "#ffffff" }}>Categorias Populares</Text>
            </View>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
              <CardCategoriaOne filterWrite={"Adoracion"} />
              <CardCategoriaOne filterWrite={"Alabanza"} />
            </View>
            
          </View>

          {/* Botón */}
          <View style={{ marginTop: 20, width: "100%" }}>
            <Button
              title="Ver canción"
              onPress={() => navigation.navigate("CreateCategorie")}
              style={{ width: "100%" }}
            />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6d6d6",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 40,
  },
  fill: {
    flex: 1,
    margin: 15,
  },
  section: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    rowGap: 15,
    columnGap: 15,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  child: {
    width: "47%",
    alignItems: "center",
    height: 180,
    maxHeight: 180,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 10,
  },
});
