import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyRate } from "../api/currency";
import { setCurrencyRateAction } from "../store";
import { getCurrencyRateSelector } from "../store/selectors";

import './CurrencyBlock.scss';

export const CurrencyBlock = () => {
  const dispatch = useDispatch();
  const rates = useSelector(getCurrencyRateSelector);
  const [activCurrency, setActivCurrency] = useState('uah');

  const [inputTrack, setInputTrack] = useState<number | string>('')
  const [inputVal, setInputVal] = useState<number | string>('');


  // const [eurhInp, setEurInp] = useState<number | string>('');
  // const [eurhInpAct, setEurInpAct] = useState<number | string>('');



  const getCurrencyRateFromServer = async () => {
    try {
      const uahFromServer = await getCurrencyRate(activCurrency, 'uah');
      const eurFromServer = await getCurrencyRate(activCurrency, 'eur');
      const usdFromServer = await getCurrencyRate(activCurrency, 'usd');

      dispatch(setCurrencyRateAction(eurFromServer));
      dispatch(setCurrencyRateAction(usdFromServer));
      dispatch(setCurrencyRateAction(uahFromServer));
    } catch (error) {
      console.log(error);
    }
  }

  const dateName = (date: string) => {
    const inpDate = date.split('-').reverse();

    switch (inpDate[1]) {
      case '01':
        inpDate[1] = 'января'
        return inpDate.join(' ');
      case '02':
        inpDate[1] = 'февраля'
        return inpDate.join(' ');
      case '03':
        inpDate[1] = 'марта'
        return inpDate.join(' ');
      case '04':
        inpDate[1] = 'апреля'
        return inpDate.join(' ');
      case '05':
        inpDate[1] = 'мая'
        return inpDate.join(' ');
      case '06':
        inpDate[1] = 'июня'
        return inpDate.join(' ');
      case '07':
        inpDate[1] = 'июля'
        return inpDate.join(' ');
      case '08':
        inpDate[1] = 'августа'
        return inpDate.join(' ');
      case '09':
        inpDate[1] = 'сентября'
        return inpDate.join(' ');
      case '10':
        inpDate[1] = 'октября'
        return inpDate.join(' ');
      case '11':
        inpDate[1] = 'ноября'
        return inpDate.join(' ');
      default:
        inpDate[1] = 'декабря'
        return inpDate.join(' ');
    }
  };

  useEffect(() => {
    getCurrencyRateFromServer();
  }, [activCurrency]);

  return (
    <>
      {!!rates.eur && (
        <div className="currency-block">
          <h2>Курс валют на {dateName(rates.date)}</h2>

          <span>Выберите валюту </span>
          <select
            name="currency-name"
            id="currencyName"
            onChange={event => {
              setActivCurrency(event.target.value);
              setInputVal(1);
              setInputTrack('');
            }}
          >
            <option value="uah">Украинская гривна</option>
            <option value="usd">Доллар США</option>
            <option value="eur">ЕВРО</option>
          </select>

          <p>Гривна - {(rates.uah * (+inputVal || 1)).toFixed(2)}</p>
          <p>US Dollar - {(rates.usd * (+inputVal || 1)).toFixed(2)}</p>
          <p>EURO - {(rates.eur * (+inputVal || 1)).toFixed(2)}</p>

          <input
            className="currency-block__input"
            type="number"
            name="uah"
            value={inputTrack}
            onChange={event => {
              setInputTrack(+event.target.value);
            }}
            onClick={() => {
              setInputVal('')
            }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                setInputVal(+event.target.value);
                setInputTrack('');
              }
            }}
          />
        </div>
      )}
    </>
  );
}
