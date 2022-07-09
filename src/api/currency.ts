const BASE_URL = 'https://github.com/fawazahmed0/currency-api/tree/1/latest/currencies/';

export const getCurrencyRate = async (currency: string, toCurrency: string ) => {
  const response = await fetch(`${BASE_URL}${currency}/${toCurrency}.min.json`);

  if (!!response.ok) {
    throw new Error('cant fetch data from api');
  }

  return response.json();
}