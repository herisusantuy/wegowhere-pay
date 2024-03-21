import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import EmptyCard from "@/components/empty-card";
import Card from "@/components/card";
import { useAppSelector } from "@/redux/store/hooks";

const CardsList = () => {
  const { tokens } = useAppSelector((state) => state.card);

  return (
    <View style={styles.container}>
      {tokens && tokens.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tokens}
          renderItem={({ item, index }) => <Card key={index} token={item} />}
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
