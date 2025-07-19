import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { getCategories } from "../apis/api.js";

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = 70;

const CarrouselCategoriasSongs = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const categories = await getCategories();
        setData(categories);
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    };
    fetchSongs();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  return (
    <View style={{ marginTop: 10 }}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        autoplay
        loop
        autoplayInterval={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  text: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CarrouselCategoriasSongs;
