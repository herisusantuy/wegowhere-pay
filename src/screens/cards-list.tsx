import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import EmptyCard from "@/components/empty-card";
import Card from "@/components/card";
import { useAppSelector } from "@/redux/store/hooks";

const CardsList = () => {
  const { cards } = useAppSelector((state) => state.card);
  return (
    <View style={styles.container}>
      {cards.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cards}
          renderItem={({ item, index }) => <Card key={index} card={item} />}
          keyExtractor={(item, index) => "key" + index}
        />
      ) : (
        <EmptyCard />
      )}
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
