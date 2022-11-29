import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import colors from "../../components/color";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db_phoneBook.db");
  return db;
}

const db = openDatabase();

const EditPhone = ({ navigation, route }) => {
  const [name, setName] = useState(route.params.name);
  const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [id, setId] = useState(route.params.id);

  const deleteData = () => {
    db.transaction((tx) => {
      tx.executeSql(`delete from tb_contact where id = ?;`, [id]);
    }, null);

    navigation.navigate("PhoneStack", { screen: "ListPhone" });
  };

  const updateData = () => {
    if (name === null || name === "") {
      Alert.alert("Information", "The fill must be filled");
      return false;
    } else if (phoneNumber === null || phoneNumber === "") {
      Alert.alert("Information", "The fill must be filled");
      return false;
    }

    if (name === route.params.name && phoneNumber === route.params.phoneNumber) {
      // Alert.alert("Information", "No changes were made");
      navigation.navigate("PhoneStack", { screen: "ListPhone" });
    } else if (name !== route.params.name && phoneNumber !== route.params.phoneNumber) {
      db.transaction((tx) => {
        tx.executeSql(`update tb_contact set name = ?, phoneNumber = ? where id = ?;`, [name, phoneNumber, id]);
      }, null);
    } else if (name !== route.params.name) {
      db.transaction((tx) => {
        tx.executeSql(`update tb_contact set name = ? where id = ?;`, [name, id]);
      }, null);
    } else if (phoneNumber !== route.params.phoneNumber) {
      db.transaction((tx) => {
        tx.executeSql(`update tb_contact set phoneNumber = ? where id = ?;`, [phoneNumber, id]);
      }, null);
    }

    navigation.navigate("PhoneStack", { screen: "ListPhone" });
  };

  const handleSave = () => {
    updateData();
    // Alert.alert("Information", `Nama : ${name} \nNo. Telp : ${phoneNumber}`);
  };

  const handleDelete = (e, id) => {
    e.persist();
    Alert.alert("Delete this contact", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deleteData(),
      },
    ]);
  };

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Text style={styles.title}>Contact Detail</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={(text) => setName(text)} />
        <TextInput placeholder="Phone Number" style={styles.input} value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)} />
        {/* <Input placeholder="Enter your email address" iconName="email" label="Email" /> */}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Delete" onPress={handleDelete} color={colors.red} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
  },
  inputContainer: {
    marginTop: 20,
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginHorizontal: "auto",
  },
});
