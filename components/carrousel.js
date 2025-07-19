import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.6;

const data = [
  { id: '1', title: 'Slide 1', image: 'https://static.vecteezy.com/system/resources/previews/014/383/622/non_2x/give-me-hand-gesture-icon-cartoon-style-vector.jpg' },
  { id: '2', title: 'Slide 2', image: 'https://images.squarespace-cdn.com/content/v1/5e436ca65c3e2f6910e128c2/85d23c0a-245b-435b-a72d-ee82af81d393/211101_NYT_Dame_4311.jpg?format=1500w' },
  { id: '3', title: 'Slide 3', image: 'https://static.wixstatic.com/media/351330_2759cc69c1414a3e86eebb6846e8ddab~mv2.png/v1/fill/w_740,h_739,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/351330_2759cc69c1414a3e86eebb6846e8ddab~mv2.png' },
  { id: '4', title: 'Slide 4', image: 'https://static.vecteezy.com/system/resources/previews/014/383/622/non_2x/give-me-hand-gesture-icon-cartoon-style-vector.jpg' },
  { id: '5', title: 'Slide 5', image: 'https://images.squarespace-cdn.com/content/v1/5e436ca65c3e2f6910e128c2/85d23c0a-245b-435b-a72d-ee82af81d393/211101_NYT_Dame_4311.jpg?format=1500w' },
  { id: '6', title: 'Slide 6', image: 'https://static.wixstatic.com/media/351330_2759cc69c1414a3e86eebb6846e8ddab~mv2.png/v1/fill/w_740,h_739,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/351330_2759cc69c1414a3e86eebb6846e8ddab~mv2.png' },
];

const Carrousel = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  return (
    <View style={{ marginTop: 20 }}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        autoplay
        loop
        autoplayDelay={2000}
        autoplayInterval={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Carrousel;
