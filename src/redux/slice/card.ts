import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createTokenAction,
  createCustomerAction,
  createChargesAction,
} from "../action/cardAction";

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
  card_number?: string;
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
  security_code?: string;
  state: any;
  street1: any;
  street2: any;
  tokenization_method: any;
}

export interface Root {
  object: string;
  id: string;
  livemode: boolean;
  location: string;
  deleted: boolean;
  metadata: Metadata;
  cards: Cards;
  default_card: string;
  description: string;
  email: string;
  created_at: string;
}

export interface Metadata {}

export interface Cards {
  object: string;
  data: Daum[];
  limit: number;
  offset: number;
  total: number;
  location: string;
  order: string;
  from: string;
  to: string;
}

export interface Daum {
  object: string;
  id: string;
  livemode: boolean;
  location: string;
  deleted: boolean;
  street1: string;
  street2: any;
  city: string;
  state: any;
  phone_number: string;
  postal_code: string;
  country: string;
  financing: string;
  bank: string;
  brand: string;
  fingerprint: string;
  first_digits: any;
  last_digits: string;
  name: string;
  expiration_month: number;
  expiration_year: number;
  security_code_check: boolean;
  tokenization_method: any;
  created_at: string;
}

const cardSlice = createSlice({
  name: "card",
  initialState: {
    loading: true,
    tokens: [] as Token[],
    customer: {} as Root,
    error: "",
    message: "",
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
      const updateToken: Token = action.payload;
      updateToken.card.card_number = action.meta.arg.cardNumber;
      updateToken.card.security_code = action.meta.arg.cvv;
      return {
        ...state,
        loading: false,
        tokens: [...state.tokens, updateToken],
      };
    });
    builder.addCase(createTokenAction.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });

    builder.addCase(createCustomerAction.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(createCustomerAction.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        tokens: action.payload,
      };
    });
    builder.addCase(createCustomerAction.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
      };
    });

    builder.addCase(createChargesAction.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(createChargesAction.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        message: "Successfully create charges.",
      };
    });
    builder.addCase(createChargesAction.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: "Failed to create charges!",
      };
    });
  },
});
export const { addCard } = cardSlice.actions;
export default cardSlice.reducer;
