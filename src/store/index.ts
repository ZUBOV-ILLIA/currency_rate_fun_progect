import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { CurrencyRateStateType, Eur } from "../react-app-env";

const currencyRateState: CurrencyRateStateType = {
    date: '',
    uah: 1,
    usd: 1,
    eur: 1,
};

export const setCurrencyRateAction = createAction<CurrencyRateStateType>('SET_CURRENCY');

const reducer = createReducer(currencyRateState, (builder) => {
    builder.addCase(setCurrencyRateAction, (state, action) => ({
        ...state,
        ...action.payload,
    }));
});

export const store = configureStore({ reducer });