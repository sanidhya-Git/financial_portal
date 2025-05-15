import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface StockData {
  value: number;
  change: number;
}

export const Market: React.FC = () => {
  const [sensexData, setSensexData] = useState<StockData>({ value: 0, change: 0 });
  const [niftyData, setNiftyData] = useState<StockData>({ value: 0, change: 0 });

  const fetchYahooStockData = async () => {
const headers = {
  'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
  'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
};

    try {
      // Nifty
      const niftyRes = await axios.get(
        'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
        {
          headers,
          params: {
            region: 'IN',
            symbols: '^NSEI',
          },
        }
      );

      const niftyQuote = niftyRes.data.quoteResponse.result[0];
      setNiftyData({
        value: niftyQuote.regularMarketPrice,
        change: niftyQuote.regularMarketChangePercent,
      });

      // Sensex
      const sensexRes = await axios.get(
        'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
        {
          headers,
          params: {
            region: 'IN',
            symbols: '^BSESN',
          },
        }
      );

      const sensexQuote = sensexRes.data.quoteResponse.result[0];
      setSensexData({
        value: sensexQuote.regularMarketPrice,
        change: sensexQuote.regularMarketChangePercent,
      });
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  useEffect(() => {
    fetchYahooStockData();
    const interval = setInterval(fetchYahooStockData, 10000); // auto refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const formatChange = (change: number) => `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;

  return (
    <div className="flex space-x-4 items-center">
      {[{ name: 'Sensex', ...sensexData }, { name: 'Nifty', ...niftyData }].map((item) => (
        <div
          key={item.name}
          className={`px-4 py-2 rounded-xl shadow-sm text-sm font-medium ${
            item.change > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          <span className="mr-2 font-semibold">{item.name}:</span>
          <span>{item.value.toFixed(2)}</span>{' '}
          <span
            className={`ml-1 font-semibold ${
              item.change > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            ({formatChange(item.change)})
          </span>
        </div>
      ))}
    </div>
  );
};

export default Market;
