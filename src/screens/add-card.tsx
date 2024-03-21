import React from "react";
import { View, StyleSheet } from "react-native";
import { ScreenProps } from "@/navigations/root-stack";
import CreditCardForm from "@/components/credit-card-form";

const AddCard: ScreenProps<"AddCard"> = () => {
  return (
    <View style={styles.container}>
      <CreditCardForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
  },
});

export default AddCard;
