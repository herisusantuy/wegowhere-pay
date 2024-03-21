import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Card = {
  holderName: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
};

type InitialState = {
  loading: boolean;
  cards: [Card];
};

const cardSlice = createSlice({
  name: "card",
  initialState: {
    loading: true,
    cards: [] as Card[],
  },
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards = [...state.cards, action.payload];
    },
  },
});
export const { addCard } = cardSlice.actions;
export default cardSlice.reducer;
