import React from "react";
import { View, Text } from "react-native";
import { ScreenProps } from "@/navigations/root-stack";

const AddCard: ScreenProps<"AddCard"> = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Add Card Screen</Text>
    </View>
  );
};

export default AddCard;
