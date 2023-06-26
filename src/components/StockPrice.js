// src/components/StockPrice.js

import { useState, useEffect } from 'react';
import stockService from '../services/stockService';

function StockPrice({ symbol }) {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    async function fetchPrice() {
      const stockPrice = await stockService.getStockPrice(symbol);
      setPrice(stockPrice);
    }
    fetchPrice();
  }, [symbol]);

  if (price === null) {
    return <p>Loading stock price for {symbol}...</p>;
  } else {
    return <p>The current stock price of {symbol} is ${price}</p>;
  }
}

export default StockPrice;
