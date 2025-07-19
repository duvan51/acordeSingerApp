import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";

const SearchInput = ({ onSearch, query, categoryProp, isDisabled = false }) => {
  const navigation = useNavigation();
  const [text, setText] = useState("");

  // Detecta cambios en categoryProp y actualiza el estado y la búsqueda automáticamente
  useEffect(() => {
    if (categoryProp) {
      setText(categoryProp);
      onSearch(categoryProp);
    }
  }, [categoryProp]); // Se ejecuta cuando categoryProp cambia

  const handleSearch = (input) => {
    setText(input);
    onSearch(input);
  };

  const handleEnterPress = () => {
    if (text.trim()) {
      navigation.navigate("SearchingList", { query: text }); // Navega al presionar Enter
    }
  };

  const inputValue = query || text;
  const inputPlaceholder = query || "Escribe algo...";

  if (isDisabled) {
    return (


      <View style={{
        height: "auto",
        flexDirection: "column",
        marginBottom: 40,
        marginTop: 20,
        gap: 10,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("SearchingLive", { categoryProp })}
        style={styles.fakeInputWrapper}
      >
        <FontAwesome name="search" size={25} color="black" />
        <Text style={styles.fakeText}>{inputValue || "Buscar..."}</Text>
      </TouchableOpacity>

      </View>
    );
  }

  return (
    <View
      style={{
        height: "auto",
        flexDirection: "column",
        marginBottom: 40,
        marginTop: 20,
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 40,
            backgroundColor: "#F5F5F5",
            borderRadius: 10,
            width: "100%",
            paddingHorizontal: 10,
            borderWidth: 0.5,
            borderColor: "grey",
          }}
        >
          <FontAwesome name="search" size={25} color="black" />
          <TextInput
            style={{ width: "80%", height: "100%", paddingHorizontal: 4 }}
            onChangeText={handleSearch}
            value={inputValue}
            placeholder={inputPlaceholder}
            onSubmitEditing={handleEnterPress} //llama a enter para buscar
            placeholderTextColor="#888"
            importantForAccessibility="no-hide-descendants"
            underlineColorAndroid="transparent"
            selectionColor="transparent"
          />
        </View>
      </View>
    </View>
  );
};

export default SearchInput;


const styles = StyleSheet.create({ 
 fakeInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "grey",
  },
  fakeText: {
    marginLeft: 8,
    color: "#888",
    fontSize: 16,
  },

})