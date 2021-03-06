import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { CurrencyRateStateType } from "../react-app-env";

const currencyRateState: CurrencyRateStateType = {
    date: '',
    uah: 0,
    usd: 0,
    eur: 0,
};

export const setCurrencyRateAction = createAction<CurrencyRateStateType>('SET_CURRENCY');

const reducer = createReducer(currencyRateState, (builder) => {
    builder.addCase(setCurrencyRateAction, (state, action) => ({
        ...state,
        ...action.payload,
    }));
});

export const store = configureStore({ reducer });