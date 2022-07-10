const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';
// const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/uah/eur.min.json';

export const getCurrencyRate = async (currency: string,toCurrency: string ) => {
  const response = await fetch(`${BASE_URL}${currency}/${toCurrency}.min.json`);

  if (!response.ok) {
    throw new Error('cant fetch data from api');
  }

  return response.json();
}