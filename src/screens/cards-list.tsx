import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import EmptyCard from "@/components/empty-card";
import { RootStackParam } from "@/navigations/root-stack";

type ScreenNavigationProps = NativeStackNavigationProp<RootStackParam>;

const CardsList = () => {
  return (
    <View style={styles.container}>
      <EmptyCard />
    </View>
  );
};

export default CardsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
