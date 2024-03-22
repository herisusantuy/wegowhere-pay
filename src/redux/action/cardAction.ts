import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Buffer } from "buffer";
import { TCard } from "./../slice/card";

const BASE_URL = "https://vault.omise.co";
const OMISE_URL = "https://api.omise.co";
const PUBLIC_KEY = "pkey_test_5wvisbxphp1zapg8ie6";
const SECRET_KEY = "skey_test_5wvisdjjoqmfof5npzw";
const authHeader = `Basic ${Buffer.from(`${PUBLIC_KEY}:`).toString("base64")}`;
const authSecretKey = `Basic ${Buffer.from(`${SECRET_KEY}:`).toString(
  "base64"
)}`;

export const createTokenAction = createAsyncThunk(
  "createTokenAction",
  async (card: TCard, { rejectWithValue }) => {
    const newCard = {
      card: {
        name: card.holderName,
        number: card.cardNumber,
        expiration_month: Number(card.expiration.split("/")[0]),
        expiration_year: Number("20" + card.expiration.split("/")[1]),
        security_code: card.cvv,
      },
    };

    try {
      const response = await axios.post(BASE_URL + "/tokens", newCard, {
        headers: {
          Authorization: authHeader,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

export const createCustomerAction = createAsyncThunk(
  "createCustomerAction",
  async (customer: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(OMISE_URL + "/customers", customer, {
        headers: {
          Authorization: authSecretKey,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response);
    }
  }
);

type Charges = {
  amount: string;
  currency: string;
  card: string;
};

export const createChargesAction = createAsyncThunk(
  "createChargesAction",
  async (charges: Charges, { rejectWithValue }) => {
    try {
      const response = await axios.post(OMISE_URL + "/charges", charges, {
        headers: {
          Authorization: authSecretKey,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
