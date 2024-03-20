import React from "react";
import { View, Text } from "react-native";
import { ScreenProps } from "@/navigations/root-stack";
import AntDesign from "@expo/vector-icons/AntDesign";

const AddCard: ScreenProps<"AddCard"> = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text>Add Card Screen</Text>
      <AntDesign name="plus" size={32} color="green" />
    </View>
  );
};

export default AddCard;
