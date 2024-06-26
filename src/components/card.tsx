import React, { FC, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import CardIcon from "./card-icon";
import { Token } from "@/redux/slice/card";
import PaymentModal from "./payment-modal";

type Props = {
  token: Token;
};

const Card: FC<Props> = ({ token }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const render4Dots = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        {[1, 2, 3, 4].map((el, index) => (
          <Entypo key={index} name="dot-single" size={20} color="black" />
        ))}
      </View>
    );
  };
  const expiration =
    token.card.expiration_month.toString() +
    "/" +
    token.card.expiration_year.toString().split("").slice(2, 4).join("");
  return (
    <TouchableOpacity
      style={[styles.container, styles.shadowProp]}
      onPress={() => setIsModalVisible(!isModalVisible)}
    >
      <PaymentModal
        token={token}
        isModalVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
      />
      <View style={styles.header}>
        <CardIcon cardType={token.card.brand.toLowerCase()} />
      </View>
      <View>
        <View style={styles.digitContainer}>
          {render4Dots()}
          {render4Dots()}
          {render4Dots()}
          <Text>{token.card.last_digits}</Text>
        </View>
        <View style={styles.content}>
          <View style={{ flex: 0.6 }}>
            <Text style={styles.key}>Name on Card</Text>
            <Text style={styles.value}>{token.card.name}</Text>
          </View>
          <View
            style={{
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.key}>Expires</Text>
            <Text style={styles.value}>{expiration}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
