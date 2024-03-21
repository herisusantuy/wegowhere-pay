import React from "react";
import { View, Text } from "react-native";
import { ScreenProps } from "@/navigations/root-stack";
import CreditCardForm from "@/components/credit-card-form";

const AddCard: ScreenProps<"AddCard"> = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 15,
      }}
    >
      <CreditCardForm />
    </View>
  );
};

export default AddCard;
