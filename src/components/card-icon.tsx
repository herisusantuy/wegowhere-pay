import React from "react";
import { Image, StyleSheet } from "react-native";

type Props = {
  cardType: string;
};
type Card = {
  icon: number;
};

export const cards: Record<string, Card> = {
  visa: {
    icon: require("../../assets/visa_h16_color.png"),
  },
  mastercard: {
    icon: require("../../assets/mastercard_color.png"),
  },
  jcb: {
    icon: require("../../assets/jcb_color.png"),
  },
};

const CardIcon: React.FC<Props> = (props) => {
  const { cardType } = props;

  const data: Card = cards[cardType || -1];

  return <Image style={styles.icon} source={data.icon} />;
};

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 32,
    resizeMode: "contain",
  },
});

export default CardIcon;
