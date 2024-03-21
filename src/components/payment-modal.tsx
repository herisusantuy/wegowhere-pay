import { Token } from "@/redux/slice/card";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";

interface CreditCardInfo {
  cardNumber: string;
  cardName: string;
  expiryMonth: string;
  expiryYear: string;
  securityCode: string;
  country: string;
}

type Props = {
  isModalVisible: boolean;
  token: Token;
  onBackdropPress: () => void;
};

const CreditCardModal: React.FC<Props> = ({
  isModalVisible,
  token,
  onBackdropPress,
}) => {
  const [creditCardInfo, setCreditCardInfo] = useState<CreditCardInfo>({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    securityCode: "",
    country: "",
  });

  const handleInputChange = (name: keyof CreditCardInfo, value: string) => {
    setCreditCardInfo({ ...creditCardInfo, [name]: value });
  };

  const handlePayButton = () => {
    onBackdropPress();
  };

  const randomBill = Math.random() * (100 - 10) + 10;
  const expiryDate =
    token.card.expiration_month.toString() +
    "/" +
    token.card.expiration_year.toString().split("").slice(2, 4).join("");
  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible} onBackdropPress={onBackdropPress}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Credit Card Information</Text>
          <View style={styles.formGroup}>
            <Text style={styles.fieldLabel}>ATM/Debit/Credit card number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="**** **** **** ****"
              keyboardType="numeric"
              maxLength={16}
              value={token.card.last_digits}
              onChangeText={(text) => handleInputChange("cardNumber", text)}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.fieldLabel}>Name on card</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Jane Doe"
              value={token.card.name}
              onChangeText={(text) => handleInputChange("cardName", text)}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Expiry Date</Text>
              <TextInput
                style={styles.textInput}
                placeholder="MM/YY"
                keyboardType="numeric"
                maxLength={3}
                value={expiryDate}
                onChangeText={(text) => handleInputChange("securityCode", text)}
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Security code</Text>
              <TextInput
                style={styles.textInput}
                placeholder="***"
                keyboardType="numeric"
                maxLength={3}
                // value={token.card.}
                onChangeText={(text) => handleInputChange("securityCode", text)}
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.fieldLabel}>Country or region</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Thailand"
              value="Thailand"
              onChangeText={(text) => handleInputChange("country", text)}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handlePayButton}
          >
            <Text style={styles.submitButtonText}>{`Pay ${randomBill.toFixed(
              2
            )} THB`}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 4,
  },
  expiryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  expiryInput: {
    flex: 1,
    marginRight: 5,
  },
  expirySeparator: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  submitButton: {
    backgroundColor: "#4AD8DA",
    padding: 15,
    borderRadius: 50,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default CreditCardModal;
