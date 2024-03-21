import React, { FC } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParam } from "@/navigations/root-stack";
import CardIcon from "./card-icon";
type Card = {
  holderName: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
};
type Props = {
  card: Card;
};

const Card: FC<Props> = ({ card }: Props) => {
  const render4Dots = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        {[1, 2, 3, 4].map((el, index) => (
          <Entypo key={index} name="dot-single" size={20} color="black" />
        ))}
      </View>
    );
  };
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <View style={styles.header}>
        <CardIcon cardNumber={card.cardNumber} />
      </View>

      <View>
        <View style={styles.digitContainer}>
          {render4Dots()}
          {render4Dots()}
          {render4Dots()}
          <Text>
            {card.cardNumber.slice(
              card.cardNumber.length - 4,
              card.cardNumber.length
            )}
          </Text>
        </View>
        <View style={styles.content}>
          <View style={{ flex: 0.4 }}>
            <Text style={styles.key}>Name on Card</Text>
            <Text style={styles.value}>{card.holderName}</Text>
          </View>
          <View
            style={{
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.key}>Expires</Text>
            <Text style={styles.value}>{card.expiration}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 179,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  header: {
    width: "100%",
    justifyContent: "flex-start",
    paddingVertical: 5,
  },
  content: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
  },
  key: {
    fontSize: 10,
    color: "#8F8F8F",
    paddingBottom: 15,
  },
  value: {
    fontSize: 14,
    color: "#000",
  },
  account: {
    color: "#808080",
    fontSize: 15,
    paddingVertical: 15,
    fontWeight: "400",
  },
  digitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    alignItems: "center",
  },
});
