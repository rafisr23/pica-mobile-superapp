import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FloatingAction } from "react-native-floating-action";
import CustomListView from "../../components/CustomListView";

const ListPhone = ({ navigation }) => {
  const getList = () => {
    return [
      {
        id: 1,
        title: "Rafi",
        image_url: "https://cdn-icons-png.flaticon.com/512/481/481078.png",
      },
      {
        id: 2,
        title: "Udin",
        image_url: "https://cdn-icons-png.flaticon.com/512/481/481078.png",
      },
      {
        id: 3,
        title: "Yoyo",
        image_url: "https://cdn-icons-png.flaticon.com/512/481/481078.png",
      },
    ];
  };

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
      <CustomListView itemList={getList()} />
      <FloatingAction
        // onOpen={() => {
        //   navigation.navigate("InputPhone");
        // }}
        position="right"
        overlayColor="rgba(0,0,0,0)"
        overrideWithAction={true}
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
    backgroundColor: "#fff",
  },
  listContainer: {
    width: "100%",
  },
});
