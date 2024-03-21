import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ScreenNavigationProps } from "@/navigations/root-stack";

const EmptyCard = () => {
  const navigation = useNavigation<ScreenNavigationProps>();
  const handleAddNewCard = () => navigation.navigate("AddCard");
  return (
    <View style={styles.container}>
      <Text style={styles.card}>💳</Text>
      <Text style={styles.title}>No Cards Found</Text>
      <Text style={styles.subtitle}>
        We recommend adding a card{"\n"} for easy payment
      </Text>
      <Button title="Add New Card" color="#4AD8DA" onPress={handleAddNewCard} />
    </View>
  );
};

export default EmptyCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    fontSize: 40,
  },
  title: {
    fontSize: 18,
    paddingVertical: 15,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 15,
  },
});
