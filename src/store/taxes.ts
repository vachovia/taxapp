import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./index";
import { TaxBracket, getBrackets } from "../api";
import {notification} from "antd"

interface State {
  income?: number;
  brackets: TaxBracket[];
}

export const taxesSlice = createSlice({
  name: "taxes",
  initialState: {
    income: undefined,
    brackets: [],
  } as State,
  reducers: {
    load(state, { payload }: PayloadAction<State["brackets"]>) {
      state.brackets = payload;
    },
    setIncome(state, { payload }: PayloadAction<number>) {
      state.income = isNaN(payload) ? 0 : Math.abs(payload);
    },
  },
});

export const { setIncome } = taxesSlice.actions;

export const load = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(taxesSlice.actions.load(await getBrackets()));
  } catch (err) {
    notification.error({ message: "Error loading tax brackets from API: " + err.message})
  }
};

export default taxesSlice.reducer;
