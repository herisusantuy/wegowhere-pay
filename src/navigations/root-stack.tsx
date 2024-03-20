import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

import AddCard from "@/screens/add-card";
import CardsList from "@/screens/cards-list";

export type RootStackParam = {
  AddCard: undefined;
  CardsList: undefined;
  EmptyCard: undefined;
};

export type ScreenProps<T extends keyof RootStackParam> = FC<
  NativeStackScreenProps<RootStackParam, T>
>;

const Stack = createNativeStackNavigator<RootStackParam>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CardsList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="CardsList"
        component={CardsList}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: "Cards",
          headerRight: () => (
            <AntDesign
              name="plus"
              size={32}
              color="black"
              onPress={() => navigation.navigate("AddCard")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Ionicons
              name="chevron-back-sharp"
              size={32}
              color="black"
              onPress={() => navigation.pop()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const RootStackNavigator = () => (
  <NavigationContainer>
    <StackNavigator />
  </NavigationContainer>
);

export default RootStackNavigator;
