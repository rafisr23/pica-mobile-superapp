import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import BottomStack from "./BottomStack";
import PhoneStack from "./PhoneStack";
import example from "../screens/phone_book/example";

// import screen
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

const NavStack = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator>
        {/* <Stack.Screen options={{ headerShown: false }} name="example" component={example} /> */}
        {/* <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} /> */}
        {/* <Stack.Screen options={{ headerShown: false }} name="Bottom" component={BottomStack} /> */}
        <Stack.Screen options={{ headerShown: false }} name="PhoneStack" component={PhoneStack} />
        {/* <Stack.Screen options={{ headerBackVisible: false, title: "Dashboard", headerTitleAlign: "center" }} name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavStack;

const styles = StyleSheet.create({});
