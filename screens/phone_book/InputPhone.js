import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";

const InputPhone = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSave = () => {
    Alert.alert("Information", `Nama : ${name} \nNo. Telp : ${phoneNumber}`);
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
        <Button title="Save" onPress={handleSave} />
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
