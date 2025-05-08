import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { MarketData } from '../types';

export const Market: React.FC = () => {
//   const location = useLocation();
  const [marketData, setMarketData] = useState<MarketData>({
    nifty: { current: null, prev: null },
    sensex: { current: null, prev: null },
  });
  const fetchMarketData = async () => {
    try {
      const nifty = Math.random() * 200 + 22000;
      const sensex = Math.random() * 300 + 73000;

      setMarketData((prev:MarketData) => ({
        nifty: {
          prev: prev.nifty.current,
          current: nifty,
        },
        sensex: {
          prev: prev.sensex.current,
          current: sensex,
        },
      }));
    } catch (err) {
      console.error('Market data fetch failed', err);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 5000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (curr: number | null, prev: number | null): string => {
    if (prev === null || curr === null || curr === prev) return 'text-gray-600';
    return curr > prev ? 'text-green-600' : 'text-red-600';
  };
  return (
    <div className='flex space-x-4 text-sm font-medium text-gray-700'>
      <div
        className={getColor(marketData.nifty.current, marketData.nifty.prev)}
      >
        Nifty 50: {marketData.nifty.current?.toFixed(2) || '--'}
      </div>
      <div
        className={getColor(marketData.sensex.current, marketData.sensex.prev)}
      >
        Sensex: {marketData.sensex.current?.toFixed(2) || '--'}
      </div>
    </div>
  );
};
