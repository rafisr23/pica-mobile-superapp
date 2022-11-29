import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListPhone from "../screens/phone_book/ListPhone";
import EditPhone from "../screens/phone_book/EditPhone";
import InputPhone from "../screens/phone_book/InputPhone";
import _list from "../screens/phone_book/_list";
import _add from "../screens/phone_book/_add";

const Stack = createNativeStackNavigator();

const PhoneStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerBackVisible: true, title: "Phone Book", headerTitleAlign: "center" }} name="ListPhone" component={ListPhone} />
      <Stack.Screen options={{ headerBackVisible: true, title: "Input", headerTitleAlign: "center" }} name="InputPhone" component={InputPhone} />
      <Stack.Screen options={{ headerBackVisible: true, title: "Detail", headerTitleAlign: "center" }} name="EditPhone" component={EditPhone} />
    </Stack.Navigator>
  );
};

export default PhoneStack;
