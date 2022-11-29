import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { FloatingAction } from "react-native-floating-action";
import CustomListView from "../../components/CustomListView";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import { useFocusEffect } from "@react-navigation/native";

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

const ListPhone = ({ navigation }) => {
  const [items, setItems] = useState(null);
  const sendData = () => {
    navigation.navigate("EditPhone", { name: name, phoneNumber: phoneNumber });
  };

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("create table if not exists tb_contact (id integer primary key not null, name text, phoneNumber text);");
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      db.transaction((tx) => {
        tx.executeSql(`select * from tb_contact;`, [], (_, { rows: { _array } }) => setItems(_array));
      });
    }, [])
  );

  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql(`select * from tb_contact;`, [], (_, { rows: { _array } }) => setItems(_array));
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log(items);
  // }, [items]);

  const actions = [
    {
      text: "Add Data",
      icon: require("../../assets/icon/plus-white.png"),
      name: "bt_add",
      position: 1,
    },
  ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      {/* <CustomListView itemList={getList()} /> */}
      {items ? (
        <CustomListView itemList={items} />
      ) : (
        // <View>
        //   <Text style={styles.sectionHeading}>Contact List</Text>
        //   {items.map(({ id, name, phoneNumber }) => (
        //     <TouchableOpacity
        //       onPress={() => {
        //         // console.log(`hello ${name}`);
        //         // navigation.navigate("EditPhone", { title: title });
        //         sendData();
        //       }}
        //     >
        //       <View style={styles.listcontainer}>
        //         <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/64/64572.png" }} style={styles.photo} />
        //         <View style={styles.container_text}>
        //           <Text style={styles.title}>{name}</Text>
        //           <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        //         </View>
        //       </View>
        //     </TouchableOpacity>
        //   ))}
        // </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>No Contact</Text>
        </View>
      )}
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
        iconHeight={20}
        iconWidth={20}
        // color="#fff"
      />
    </KeyboardAvoidingView>
  );
};

export default ListPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingVertical: 20,
    // paddingHorizontal: 5,
  },
});
