import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Search, ArrowUp, ArrowDown } from 'lucide-react';

// Define TypeScript interfaces
interface Stock {
  symbol: string;
  name: string;
  price: number;
  previousClose: number;
  amount: number;
  marketValue: number;
  priceChange?: number;
  changePercent?: number;
  valueChange?: number;
}

interface SortConfig {
  key: keyof Stock;
  direction: 'ascending' | 'descending';
}

// Sample stock data with growth percentages
const sampleStockData: Stock[] = [
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries', price: 2879.45, previousClose: 2840.10, amount: 15, marketValue: 43191.75 },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services', price: 3456.80, previousClose: 3498.25, amount: 8, marketValue: 27654.40 },
  { symbol: 'INFY.NS', name: 'Infosys Limited', price: 1423.60, previousClose: 1398.50, amount: 20, marketValue: 28472.00 },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', price: 1678.90, previousClose: 1695.40, amount: 12, marketValue: 20146.80 },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank', price: 986.75, previousClose: 970.30, amount: 25, marketValue: 24668.75 },
  { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance', price: 6890.25, previousClose: 6750.80, amount: 5, marketValue: 34451.25 },
  { symbol: 'SBIN.NS', name: 'State Bank of India', price: 745.20, previousClose: 752.60, amount: 30, marketValue: 22356.00 },
  { symbol: 'ADANIENT.NS', name: 'Adani Enterprises', price: 2456.40, previousClose: 2398.75, amount: 7, marketValue: 17194.80 }
];

const stocks = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'ascending' });
  const [totalValue, setTotalValue] = useState(0);
  const [totalGrowth, setTotalGrowth] = useState(0);

  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      const processedStocks: Stock[] = sampleStockData.map(stock => {
        const priceChange = stock.price - stock.previousClose;
        const changePercent = (priceChange / stock.previousClose) * 100;
        
        return {
          ...stock,
          priceChange,
          changePercent,
          valueChange: priceChange * stock.amount
        };
      });
      
      setStocks(processedStocks);
      
      // Calculate portfolio metrics
      const portfolioValue = processedStocks.reduce((sum, stock) => sum + stock.marketValue, 0);
      const portfolioGrowth = processedStocks.reduce((sum, stock) => sum + (stock.valueChange || 0), 0);
      const growthPercent = (portfolioGrowth / (portfolioValue - portfolioGrowth)) * 100;
      
      setTotalValue(portfolioValue);
      setTotalGrowth(growthPercent);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSort = (key: keyof Stock) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedStocks = React.useMemo(() => {
    if (loading) return [];
    
    let sortableStocks = [...stocks];
    if (searchTerm) {
      sortableStocks = sortableStocks.filter(stock => 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (sortConfig.key) {
      sortableStocks.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableStocks;
  }, [stocks, searchTerm, sortConfig, loading]);

  const refreshData = () => {
    setLoading(true);
    // In a real app, we would fetch fresh data here
    setTimeout(() => {
      // Simulate refreshed data with slight changes
      const refreshedStocks: Stock[] = stocks.map(stock => {
        const randomChange = (Math.random() * 2 - 1) * 5; // Random change between -5% and +5%
        const newPrice = stock.price * (1 + randomChange / 100);
        const priceChange = newPrice - stock.previousClose;
        const changePercent = (priceChange / stock.previousClose) * 100;
        
        return {
          ...stock,
          price: newPrice,
          priceChange,
          changePercent,
          marketValue: newPrice * stock.amount,
          valueChange: priceChange * stock.amount
        };
      });
      
      setStocks(refreshedStocks);
      
      // Recalculate portfolio metrics
      const portfolioValue = refreshedStocks.reduce((sum, stock) => sum + stock.marketValue, 0);
      const portfolioGrowth = refreshedStocks.reduce((sum, stock) => sum + (stock.valueChange || 0), 0);
      const growthPercent = (portfolioGrowth / (portfolioValue - portfolioGrowth)) * 100;
      
      setTotalValue(portfolioValue);
      setTotalGrowth(growthPercent);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      
      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search stocks by name or symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Stocks Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('name')}
                  >
                    Stock
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('price')}
                  >
                    Price
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('changePercent')}
                  >
                    Change
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('amount')}
                  >
                    Amount
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSort('marketValue')}
                  >
                    Market Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedStocks.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold">{stock.name}</span>
                        <span className="text-sm text-gray-500">{stock.symbol}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">₹ {stock.price.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.changePercent >= 0 ? (
                          <ArrowUp className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 mr-1" />
                        )}
                        <span className="font-medium">{Math.abs(stock.changePercent).toFixed(2)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">{stock.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">₹ {stock.marketValue.toFixed(2)}</span>
                        <span className={`text-sm ${stock.valueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.valueChange >= 0 ? '+' : ''}₹ {stock.valueChange.toFixed(2)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {sortedStocks.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No stocks found matching your search.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default stocks;