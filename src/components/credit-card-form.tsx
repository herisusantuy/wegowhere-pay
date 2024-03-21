import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import cardValidator from "card-validator";
import FormTextField from "./form-text-field";
import {
  cardNumberFormatter,
  expirationDateFormatter,
} from "@/utils/formatters";
import { useAppDispatch } from "@/redux/store/hooks";
import { addCard } from "@/redux/slice/card";

interface FormModel {
  holderName: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
}
const CreditCardForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const formMethods = useForm<FormModel>({
    mode: "onChange",
    defaultValues: {
      holderName: "",
      cardNumber: "",
      expiration: "",
      cvv: "",
    },
  });

  const cardNumber = formMethods.watch("cardNumber");
  const cardType = cardValidator.number(cardNumber).card?.niceType;

  function onSubmit(model: FormModel) {
    dispatch(addCard(model));
  }
  return (
    <View style={styles.container}>
      <FormProvider {...formMethods}>
        <View>
          <FormTextField
            style={styles.textField}
            name="cardNumber"
            label="ATM/Debit/Credit card number"
            keyboardType="number-pad"
            rules={{
              required: "Card number is required.",
              validate: {
                isValid: (value: string) => {
                  return (
                    cardValidator.number(value).isValid ||
                    "This card number looks invalid."
                  );
                },
              },
            }}
            formatter={cardNumberFormatter}
            placeholder="0000 0000 0000 0000"
          />
          <View
            style={{
              flexDirection: "row",
              width: "30%",
              position: "absolute",
              right: 5,
              top: 80,
              justifyContent: "space-around",
            }}
          >
            <Image
              source={require("../../assets/visa_color.png")}
              resizeMode="center"
            />
            <Image source={require("../../assets/mastercard_color.png")} />
            <Image source={require("../../assets/jcb_color.png")} />
          </View>
        </View>

        <FormTextField
          style={styles.textField}
          name="holderName"
          label="Name on Card"
          rules={{
            required: "Name on Card is required.",
            validate: {
              isValid: (value: string) => {
                return (
                  cardValidator.cardholderName(value).isValid ||
                  "Name on Card looks invalid."
                );
              },
            },
          }}
          placeholder="Ty Lee"
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <FormTextField
            style={[styles.textField, { flex: 0.45 }]}
            name="expiration"
            label="Expiry date"
            rules={{
              required: "Expiry date is required.",
              validate: {
                isValid: (value: string) => {
                  return (
                    cardValidator.expirationDate(value).isValid ||
                    "This expiration date looks invalid."
                  );
                },
              },
            }}
            formatter={expirationDateFormatter}
            placeholder="MM/YY"
          />
          <FormTextField
            style={[styles.textField, { flex: 0.45 }]}
            name="cvv"
            label="CVV"
            keyboardType="number-pad"
            maxLength={4}
            rules={{
              required: "Security code is required.",
              validate: {
                isValid: (value: string) => {
                  const cardNumber = formMethods.getValues("cardNumber");
                  const { card } = cardValidator.number(cardNumber);
                  const cvvLength = card?.type === "american-express" ? 4 : 3;
                  return (
                    cardValidator.cvv(value, cvvLength).isValid ||
                    "This security code looks invalid."
                  );
                },
              },
            }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 40,
          }}
        >
          <Image source={require("../../assets/secure_payment.png")} />
        </View>
        <View
          style={{
            flex: 1,
            paddingBottom: 30,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#4AD8DA",
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
              borderRadius: 50,
            }}
            onPress={formMethods.handleSubmit(onSubmit)}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>
              Add Card
            </Text>
          </TouchableOpacity>
        </View>
      </FormProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 36,
  },
  textField: {
    marginTop: 24,
    height: 100,
  },
  regularField: {
    flex: 1,
    marginTop: 24,
  },
  button: {
    width: 100,
    alignSelf: "flex-end",
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 24,
    backgroundColor: "#0093E9",
  },
});

export default CreditCardForm;
