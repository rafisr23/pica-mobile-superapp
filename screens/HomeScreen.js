import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../components/Button";
import { auth } from "../firebase";
// import HomeStack from "../navigation/HomeStack";

const HomeScreen = ({ navigation }) => {
  // const auth = {
  //   email: auth.currentUser?.email,
  // };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handlePhone = () => {
    navigation.navigate("PhoneStack");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View>
        <Text style={styles.text}>Home Screen</Text>
        <Text style={styles.text}>{auth.currentUser?.email}</Text>
        <Button title="Phone" onPress={handlePhone} />
      </View>
      {/* <View style={styles.buttonContainer}>
        <Button title="Sign out" mb={8} onPress={handleSignOut} />
      </View> */}
      {/* <HomeStack /> */}
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 40,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
