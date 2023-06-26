import React, { useState } from 'react';

function StockTable() {
  const [stocks, setStocks] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$143', change: '+1.5%' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: '$730', change: '-0.3%' },
    { symbol: 'AMZN', name: 'Amazon.com', price: '$3,171', change: '+0.8%' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$2,332', change: '+1.2%' },
    { symbol: 'MSFT', name: 'Microsoft', price: '$259', change: '-0.5%' },
  ]);

  const [featuredStocks, setFeaturedStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFeature = (stock) => {
    setFeaturedStocks([...featuredStocks, stock]);
  };

  const handleUnfeature = (stock) => {
    setFeaturedStocks(featuredStocks.filter((s) => s !== stock));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showAvailableStocks = filteredStocks.length <= 3;

  return (
    <div>
      <h2>Featured Stocks</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {featuredStocks.map((stock, index) => (
            <tr key={index}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>{stock.price}</td>
              <td>{stock.change}</td>
              <td>
                <button onClick={() => handleUnfeature(stock)}>Unfeature</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Search Stocks</h2>
      <input type="text" placeholder="Search stocks..." onChange={handleSearch} />
      {showAvailableStocks && (
        <>
          <h2>Available Stocks</h2>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Company Name</th>
                <th>Price</th>
                <th>Change</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.symbol}</td>
                  <td>{stock.name}</td>
                  <td>{stock.price}</td>
                  <td>{stock.change}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleFeature(stock);
                        setSearchQuery('');
                      }}
                      disabled={featuredStocks.includes(stock)}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default StockTable;
