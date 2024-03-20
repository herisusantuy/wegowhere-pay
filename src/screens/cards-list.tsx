import React from "react";
import { View, Text } from "react-native";
import { ScreenProps } from "@/navigations/root-stack";

const CardsList: ScreenProps<"CardsList"> = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Cards List Screen</Text>
    </View>
  );
};

export default CardsList;
