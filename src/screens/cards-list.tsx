import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import EmptyCard from "@/components/empty-card";
import Card from "@/components/card";
import { RootStackParam } from "@/navigations/root-stack";

type ScreenNavigationProps = NativeStackNavigationProp<RootStackParam>;
const cards = [
  {
    cardNumber: String(3530111333300000),
    holderName: "John Doe",
    expiration: "12/25",
    cvv: "123",
  },
  {
    cardNumber: String(5555555555554444),
    holderName: "John Doe",
    expiration: "12/25",
    cvv: "123",
  },
  {
    cardNumber: String(4111111111111111),
    holderName: "John Doe",
    expiration: "12/25",
    cvv: "123",
  },
];
const CardsList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cards}
        renderItem={({ item, index }) => <Card key={index} card={item} />}
        keyExtractor={(item, index) => "key" + index}
      />
    </View>
  );
};

export default CardsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
  },
});
