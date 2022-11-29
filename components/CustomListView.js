import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React, { useState } from "react";
import CustomRowView from "./CustomRowView";

const CustomListView = ({ itemList }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <View style={styles.container}>
      <FlatList data={itemList} renderItem={({ item }) => <CustomRowView name={item.name} phoneNumber={item.phoneNumber} id={item.id} />} keyExtractor={(item) => item.id} extraData={selectedId} />
    </View>
  );
};

export default CustomListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
