import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FloatingAction } from "react-native-floating-action";

const ListPhone = ({ navigation }) => {
  const actions = [
    {
      text: "Add Data",
      // icon: require("./images/ic_accessibility_white.png"),
      name: "bt_add",
      position: 1,
    },
  ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View>
        <Text>ListPhone</Text>
      </View>
      <FloatingAction
        // onOpen={() => {
        //   navigation.navigate("InputPhone");
        // }}
        position="right"
        overlayColor="rgba(0,0,0,0)"
        overrideWithAction="true"
        actions={actions}
        onPressItem={() => {
          navigation.navigate("InputPhone");
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default ListPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
