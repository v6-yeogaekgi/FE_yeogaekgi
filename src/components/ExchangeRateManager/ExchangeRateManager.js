import axios from 'axios';

export const fetchAndStoreExchangeRate = async () => {
    try {
        const storedRates = localStorage.getItem('exchangeRate');
        if (storedRates) {
            return JSON.parse(storedRates);
        }

        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        const rates = {
            USD: response.data.rates.USD,
            JPY: response.data.rates.JPY,
            CNY: response.data.rates.CNY,
            KRW: response.data.rates.KRW,
        };
        localStorage.setItem('exchangeRate', JSON.stringify(rates));
        return rates;
    } catch (error) {
        console.error('환율 정보를 가져오는 중 오류 발생:', error);
        return null;
    }
};

export const getExchangeRate = () => {
    const storedRates = localStorage.getItem('exchangeRate');
    return storedRates ? JSON.parse(storedRates) : null;
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
    const rates = getExchangeRate();
    if (!rates) return null;

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (!fromRate || !toRate) return null;

    return (amount / fromRate) * toRate;
};