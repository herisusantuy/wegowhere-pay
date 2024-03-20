import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import EmptyCard from "@/components/empty-card";
import Card from "@/components/card";
import { RootStackParam } from "@/navigations/root-stack";

type ScreenNavigationProps = NativeStackNavigationProp<RootStackParam>;
const sampleCard: Card = {
  account: 1234234534564566,
  name: "John Doe",
  expires: "12/25",
};
const cards = [
  sampleCard,
  sampleCard,
  sampleCard,
  sampleCard,
  sampleCard,
  sampleCard,
];
const CardsList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cards}
        renderItem={({ item, index }) => <Card card={item} />}
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
