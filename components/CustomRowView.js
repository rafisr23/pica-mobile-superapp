import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";

const CustomRowView = ({ title, description, image_url }) => {
  const navigation = useNavigation();
  const [name, setTitle] = useState({ title });

  const sendData = () => {
    navigation.navigate("EditPhone", { title: title });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        console.log(`hello ${title}`);
        // navigation.navigate("EditPhone", { title: title });
        sendData();
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: image_url }} style={styles.photo} />
        <View style={styles.container_text}>
          <Text style={styles.title}>{title}</Text>
          {/* <Text style={styles.description}>{description}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomRowView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    // borderRadius: 10,
    backgroundColor: "#FFF",
    // borderColor: "#FFF",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
    elevation: 2,
    // width: "90%",
  },
  title: {
    fontSize: 20,
    color: "#000",
    marginLeft: 10,
  },
  container_text: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
    justifyContent: "center",
  },
  description: {
    fontSize: 16,
    fontStyle: "italic",
  },
  photo: {
    justifyContent: "center",
    alignSelf: "center",
    height: 50,
    width: 50,
  },
});
