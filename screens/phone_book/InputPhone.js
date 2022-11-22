import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React from "react";

const InputPhone = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View>
        <Text>InputPhone</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
