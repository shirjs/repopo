

const apiKey = 'I3BVSCB1G5QZVWLZ';

async function getStockPrice(symbol) {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const stockPrice = data['Global Quote']['05. price'];
  return stockPrice;
}

export default { getStockPrice };
