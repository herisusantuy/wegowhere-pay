import { createChargesAction } from "@/redux/action/cardAction";
import { Token } from "@/redux/slice/card";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
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
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.card);
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
  const randomBill = Math.random() * (15000000 - 2000) + 2000;

  const handlePayButton = async () => {
    const response = await dispatch(
      createChargesAction({
        amount: String(randomBill),
        currency: "thb",
        card: token.id,
      })
    );

    if (response.type == "createChargesAction/fulfilled") {
      Alert.alert("Info", "Successfully pay the bill! ", [
        { text: "OK", onPress: () => onBackdropPress() },
      ]);
    }

    if (response.type == "createChargesAction/rejected") {
      Alert.alert("Alert", `Failed to pay the bill! ${response.payload}`, [
        { text: "Cancel", onPress: () => onBackdropPress() },
      ]);
    }
  };

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
              maxLength={16}
              value={token.card.card_number}
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
                maxLength={3}
                value={expiryDate}
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.fieldLabel}>Security code</Text>
              <TextInput
                style={styles.textInput}
                placeholder="***"
                maxLength={3}
                value={token.card.security_code}
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
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handlePayButton}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading
                ? "Processing.."
                : `Pay ${randomBill.toLocaleString("en-US", {
                    style: "currency",
                    currency: "THB",
                  })}`}
            </Text>
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
    marginBottom: 20,
    fontWeight: "700",
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
    marginTop: 20,
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
