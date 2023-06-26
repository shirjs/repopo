import React from 'react';

function StockScreener() {
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: '$143', change: '+1.5%' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: '$730', change: '-0.3%' },
    { symbol: 'AMZN', name: 'Amazon.com', price: '$3,171', change: '+0.8%' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '$2,332', change: '+1.2%' },
    { symbol: 'MSFT', name: 'Microsoft', price: '$259', change: '-0.5%' },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Company Name</th>
          <th>Price</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock, index) => (
          <tr key={index}>
            <td>{stock.symbol}</td>
            <td>{stock.name}</td>
            <td>{stock.price}</td>
            <td>{stock.change}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StockScreener;
