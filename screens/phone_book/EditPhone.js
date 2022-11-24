import { StyleSheet, Text, View } from "react-native";
import React from "react";

const EditPhone = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>{route.params.title}</Text>
      <Text>Hallo</Text>
    </View>
  );
};

export default EditPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
