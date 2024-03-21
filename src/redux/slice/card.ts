import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTokenAction } from "../action/cardAction";

export type TCard = {
  holderName: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
};

export interface Token {
  card: Card;
  charge_status: string;
  created_at: string;
  id: string;
  livemode: boolean;
  location: string;
  object: string;
  used: boolean;
}

export interface Card {
  bank: string;
  brand: string;
  city: any;
  country: string;
  created_at: string;
  deleted: boolean;
  expiration_month: number;
  expiration_year: number;
  financing: string;
  fingerprint: string;
  first_digits: any;
  id: string;
  last_digits: string;
  livemode: boolean;
  location: any;
  name: string;
  object: string;
  phone_number: any;
  postal_code: any;
  security_code_check: boolean;
  state: any;
  street1: any;
  street2: any;
  tokenization_method: any;
}

const cardSlice = createSlice({
  name: "card",
  initialState: {
    loading: true,
    tokens: [] as Token[],
  },
  reducers: {
    addCard: (state, action: PayloadAction<Token>) => {
      state.tokens = [...state.tokens, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTokenAction.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(createTokenAction.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        tokens: [...state.tokens, action.payload],
      };
    });
    builder.addCase(createTokenAction.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});
export const { addCard } = cardSlice.actions;
export default cardSlice.reducer;
