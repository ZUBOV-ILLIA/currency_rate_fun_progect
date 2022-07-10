import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrencyRate } from './api/currency';
import './App.css';
import { setCurrencyRateAction } from './store';
import { getCurrencyRateSelector } from './store/selectors';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const rates = useSelector(getCurrencyRateSelector);

  const getCurrencyRateFromServer = async () => {
    const eurFromServer = await getCurrencyRate('eur');
    const usdFromServer = await getCurrencyRate('usd');

    dispatch(setCurrencyRateAction(eurFromServer));
    dispatch(setCurrencyRateAction(usdFromServer));
  }

  useEffect(() => {
    getCurrencyRateFromServer();
  }, []);

  console.log(rates, 'rates');

  return (
    <div className="App">
      <h2>{`Курс валют к гривне на ${rates.date}`}</h2>

      <p>EURO - {rates.eur}</p>
      <p>US Dollar - {rates.usd}</p>
    </div>
  );
}

export default App;
