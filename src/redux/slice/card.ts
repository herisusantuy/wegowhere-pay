import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCard = {
  holderName: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
};

const cardSlice = createSlice({
  name: "card",
  initialState: {
    loading: true,
    cards: [] as TCard[],
  },
  reducers: {
    addCard: (state, action: PayloadAction<TCard>) => {
      state.cards = [...state.cards, action.payload];
    },
  },
});
export const { addCard } = cardSlice.actions;
export default cardSlice.reducer;
