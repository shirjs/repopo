import React, { useEffect,useState } from 'react';
import '../StockApp.css';
import StockScreener from '../StockScreener';
import StockTable from '../StockTable';
import stockService from '../services/stockService';

function StockApp() {
  // user data:
  const [cash, setCash] = useState(() => {
    const cashFromStorage = localStorage.getItem('cash');
    return cashFromStorage ? parseFloat(cashFromStorage) : 10000000;
  });
  const [holdings, setHoldings] = useState(() => {
    const holdingsFromStorage = localStorage.getItem('holdings');
    return holdingsFromStorage ? JSON.parse(holdingsFromStorage) : {};
  });
  
  const [prices, setPrices] = useState(() => {
    const pricesFromStorage = localStorage.getItem('prices');
    return pricesFromStorage ? JSON.parse(pricesFromStorage) : {};
  });
  
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);
  const [stocks, setStocks] = useState([]);

  // Update cash in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cash', cash);
    localStorage.setItem('stocks', JSON.stringify(stocks));
  }, [cash, stocks]);
  
  useEffect(() => {
    localStorage.setItem('holdings', JSON.stringify(holdings));
    localStorage.setItem('prices', JSON.stringify(prices));
  }, [holdings, prices]);
  

  // handle invest
  const handleInvest = async (event) => {
    event.preventDefault();
    const { symbol, amount } = event.target.elements;
    const stockPrice = await stockService.getStockPrice(symbol.value);
    const sharesToBuy = Math.floor(amount.value / stockPrice);
    setCash(cash - amount.value + (amount.value % stockPrice));
    setHoldings({
      ...holdings,
      [symbol.value]: (holdings[symbol.value] || 0) + sharesToBuy,
    });
    setPrices({
      ...prices,
      [symbol.value]: stockPrice,
    });
  };

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleGetPriceClick = async () => {
    const stockPrice = await stockService.getStockPrice(symbol);
    setPrice(stockPrice);
  };

  return (
    <div className="App">
      <div className='App-container'>
      <table border="1">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Shares</th>
            <th>Price</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(holdings).map(([symbol, shares]) => (
            <tr key={symbol}>
              <td>{symbol}</td>
              <td>{shares}</td>
              <td>{prices[symbol]}</td>
              <td>{prices[symbol] * shares}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Cash: ${cash}</p>


      {/*<StockScreener />
      <StockTable /> */}
      <div>
        <form onSubmit={handleInvest}>
          <label>
            Symbol:
            <input type="text" name="symbol" />
          </label>
          <br />
          <label>
            Amount:
            <input type="number" name="amount" />
          </label>
          <br />
          <button type="submit">Invest</button>
        </form>
      </div>
      </div>
      {/*<div>
        <input type="text" value={symbol} onChange={handleSymbolChange} />
        <button onClick={handleGetPriceClick}>Get Price</button>
        {price !== null && <p>The current stock price of {symbol} is ${price}</p>}
      </div>


    <p>checking</p>*/}
    </div>
  );
}

export default StockApp;