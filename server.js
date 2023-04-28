const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested, Content-Type, Accept Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const PORT = process.env.PORT || 3000;

const fetchStockPrice = async (symbol) => {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data['Error Message'] || data['Note']) {
      return { error: 'Error fetching stock data' };
    }

    const stockInfo = data['Global Quote'];
    return {
      symbol: stockInfo['01. symbol'],
      price: stockInfo['05. price'],
    };
  } catch (error) {
    return { error: 'Error fetching stock data' };
  }
};

app.get('/api/stock/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const stockData = await fetchStockPrice(symbol);
  res.json(stockData);
});

// Serve React app in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, 'build')));
  
    // Serve the index.html file for any request that doesn't match the API routes
    app.get(/^(?!\/(api|chatbot)).*$/, (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
  }
  

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
