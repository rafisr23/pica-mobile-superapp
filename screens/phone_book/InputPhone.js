import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
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

const InputPhone = ({ navigation }) => {
  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  // const [forceUpdate, forceUpdateId] = useForceUpdate();

  // function useForceUpdate() {
  //   const [value, setValue] = useState(0);
  //   return [() => setValue(value + 1), value];
  //   const [value2, setValue2] = useState(0);
  //   return [() => setValue(value2 + 1), value2];
  // }

  const handleSave = (name, phoneNumber) => {
    // Alert.alert("Information", `Nama : ${name} \nNo. Telp : ${phoneNumber}`);
    // is text empty?
    if (name === null || name === "") {
      // return false;
      Alert.alert("Information", "The fill must be filled");
    }
    if (phoneNumber === null || phoneNumber === "") {
      Alert.alert("Information", "The fill must be filled");
      // return false;
    }

    db.transaction((tx) => {
      tx.executeSql("insert into tb_contact (name, phoneNumber) values (?, ?)", [name, phoneNumber]);
      tx.executeSql("select * from tb_contact", [], (_, { rows }) => console.log(JSON.stringify(rows)));
    }, null);

    setName("");
    setPhoneNumber("");

    navigation.navigate("PhoneStack", { screen: "ListPhone" });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Text style={styles.title}>Input Contact</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={(text) => setName(text)} />
        <TextInput placeholder="Phone Number" style={styles.input} value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)} />
        {/* <Input placeholder="Enter your email address" iconName="email" label="Email" /> */}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={() => handleSave(name, phoneNumber)} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputPhone;

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
