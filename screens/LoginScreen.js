import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import colors from "../components/color";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    // Alert.alert("Information", "Sign Up");
    // alert("Sign Up");
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleLogin = () => {
    // Alert.alert("Information", "Login");
    // alert("Login");
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user.email);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }, 3000);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Loader visible={loading} />
      {/* <StatusBar style="light" /> */}
      <View style={styles.inputContainer}>
        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={(text) => setEmail(text)} />
        <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
        {/* <Input placeholder="Enter your email address" iconName="email" label="Email" /> */}
      </View>

      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity> */}
        <Button title="Login" mb={8} onPress={handleLogin} />
        <Button title="Register" color={colors.white} fc={colors.gold} bw={2} onPress={handleSignUp} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    // paddingHorizontal: 40,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 8,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {},
});
