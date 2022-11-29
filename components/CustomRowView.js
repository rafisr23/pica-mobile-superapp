import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";

const CustomRowView = ({ name, phoneNumber, id }) => {
  const navigation = useNavigation();

  const sendData = () => {
    navigation.navigate("EditPhone", { name: name, phoneNumber: phoneNumber, id: id });
  };

  // const [items, setItems] = useState(null);

  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(`select * from items where done = ?;`, [doneHeading ? 1 : 0], (_, { rows: { _array } }) => setItems(_array));
  //   });
  // }, []);

  // const heading = doneHeading ? "Completed" : "Todo";

  // if (items === null || items.length === 0) {
  //   return null;
  // }

  return (
    <TouchableOpacity
      onPress={() => {
        // console.log(`hello ${name}`);
        // navigation.navigate("EditPhone", { title: title });
        sendData();
      }}
    >
      <View style={styles.container}>
        <Image source={require("../assets/img/user.png")} style={styles.photo} />
        <View style={styles.container_text}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
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
    borderRadius: 10,
    backgroundColor: "#FFF",
    // borderColor: "#FFF",
    borderBottomColor: "#000",
    // borderBottomWidth: 1,
    // elevation: 2,
    // width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 20,
    color: "#000",
    // marginLeft: 10,
  },
  container_text: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
    justifyContent: "center",
  },
  phoneNumber: {
    fontSize: 16,
    // fontStyle: "italic",
    color: "grey",
  },
  photo: {
    justifyContent: "center",
    alignSelf: "center",
    height: 50,
    width: 50,
  },
});
