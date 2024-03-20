import React, { FC } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParam } from "@/navigations/root-stack";
import { maskNumber } from "@/utils";

type ScreenNavigationProps = NativeStackNavigationProp<RootStackParam>;
type Card = {
  account: number;
  name: string;
  expires: string;
};
type Props = {
  card: Card;
};

const Card: FC<Props> = ({ card }: Props) => {
  const navigation = useNavigation<ScreenNavigationProps>();
  const handleAddNewCard = () => navigation.navigate("AddCard");
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <View style={styles.header}>
        <Image source={require("../../assets/visa_h16_color.png")} />
      </View>

      <View>
        <Text style={styles.account}>{maskNumber(card.account)}</Text>
        <View style={styles.content}>
          <View style={{ flex: 0.4 }}>
            <Text style={styles.key}>Name on Card</Text>
            <Text style={styles.value}>{card.name}</Text>
          </View>
          <View style={{ flex: 0.3 }}>
            <Text style={styles.key}>Expires</Text>
            <Text style={styles.value}>{card.expires}</Text>
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
    shadowRadius: 6,
  },
  header: {
    width: "100%",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  content: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
});
