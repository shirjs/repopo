

const apiKey = process.env.A_Stock_API_FOR_FUN;

async function getStockPrice(symbol) {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const stockPrice = data['Global Quote']['05. price'];
  return stockPrice;
}

export default { getStockPrice };
// const getURL = () => {
//   let url =
//     process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
//     process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
//     'http://localhost:3000/'
//   // Make sure to include `https://` when not localhost.
//   url = url.includes('http') ? url : `https://${url}`
//   // Make sure to include a trailing `/`.
//   url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
//   return url
// }