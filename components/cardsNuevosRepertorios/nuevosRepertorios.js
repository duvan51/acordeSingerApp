import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import ImageRepertorio from "../../assets/imagenGruppal.png"

export default function HorizontalScroll() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
    >
        <View style={styles.box}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
               width:"100%"
            }}
          >
            <View
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={ImageRepertorio}
                style={{
                  width: "90%",
                  height: "90%",
                }}
              />
            </View>
            <View style={{ width: "50%", height: "100%" }}>
              <View style={{}}>
                <Text
                  style={{ fontSize: 12, fontWeight: 500, color: "#ffffff" }}
                >
                  Montesanto
                </Text>
                <Text style={{ fontSize: 11, color: "#ffffff" }}>
                  5 canciones
                </Text>
              </View>
              <View style={{ paddingTop: 4 }}>
                <Text style={{ fontSize: 10, color: "#ffffff" }}>
                  {" "}
                  * Dios manda lluvia{" "}
                </Text>
                <Text style={{ fontSize: 10, color: "#ffffff" }}>
                  {" "}
                  * Dios manda lluvia{" "}
                </Text>
                <Text style={{ fontSize: 10, color: "#ffffff" }}>
                  {" "}
                  * Dios manda lluvia{" "}
                </Text>
                <Text style={{ fontSize: 10, color: "#ffffff" }}>
                  {" "}
                  * Dios manda lluvia{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.box}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width:"100%"
            }}
          >
            <View
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={ImageRepertorio}
                style={{
                  width: "90%",
                  height: "90%",
                }}
              />
            </View>
            <View style={{ width: "50%", height: "100%" }}>
              <View style={{}}>
                <Text
                  style={{ fontSize: 12, fontWeight: 500, color: "#ffffff" }}
                >
                  Montesanto
                </Text>
                <Text style={{ fontSize: 11, color: "#ffffff" }}>
                  5 canciones
                </Text>
              </View>
              <View style={{ paddingTop: 4 }}>
                <Text style={{ fontSize: 10, color: "#ffffff" }}>
                  {" "}
                  * Dios manda lluvia{" "}
                </Text>
                <Text style={{ fontSize: 10, color: "#ffffff" }}>
                  {" "}
                  * Dios manda lluvia{" "}
                </Text>
                <Text style={{ fontSize: 10, color: "#ffffff" }}>
                  {" "}
                  * Dios manda lluvia{" "}
                </Text>
                <Text style={{ fontSize: 10, color: "#ffffff" }}>
                  {" "}
                  * Dios manda lluvia{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.box}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
               width:"100%"
            }}
          >
            <View
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={ImageRepertorio}
                style={{
                  width: "90%",
                  height: "90%",
                }}
              />
            </View>
            <View style={{ width: "50%", height: "100%" }}>
              <View style={{}}>
                <Text
                  style={{ fontSize: 12, fontWeight: 500, color: "#ffffff" }}
                >
                  Montesanto
                </Text>
                <Text style={{ fontSize: 11, color: "#ffffff" }}>
                  5 canciones
                </Text>
              </View>
              <View style={{ paddingTop: 4 }}>
                <Text style={{ fontSize: 10, color: "#ffffff" }}>
                  {" "}
                  * Dios manda lluvia{" "}
                </Text>
                <Text style={{ fontSize: 10, color: "#ffffff" }}>
                  {" "}
                  * Dios manda lluvia{" "}
                </Text>
                <Text style={{ fontSize: 10, color: "#ffffff" }}>
                  {" "}
                  * Dios manda lluvia{" "}
                </Text>
                <Text style={{ fontSize: 10, color: "#ffffff" }}>
                  {" "}
                  * Dios manda lluvia{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
    paddingVertical: 10,
    height:"auto"
  },

  box: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#324879",
    width: 250,
    height: 110,
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
});
