import React, { useState } from 'react';
import { Search } from 'lucide-react';

const backendUrl = import.meta.env.VITE_Search_URL;

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: query }),
        });

        const data = await res.json();
        alert(data.reply);
      } catch (err) {
        console.error('Search error:', err);
        alert('Something went wrong.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder={loading ? 'Thinking...' : 'Search...'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full pl-10 pr-4 py-2 border-b border-gray-300 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-600 transition-all"
      />
    </div>
  );
};
