Chatbot Back-End 🤖🌤️📈
Python Node.js Heroku

This repository contains the back-end code for the Chatbot React/Python application that utilizes OpenAI, OpenWeather, and Alpha Advantage APIs for natural language processing, weather information, and stock market data respectively. The back-end is built using Python, Flask, and Node.js, and it is hosted on Heroku.

Getting Started 🚀
Before setting up the back-end, make sure you have valid API keys from OpenAI, OpenWeather, and Alpha Advantage. You will also need Python, pip, Node.js, and npm installed on your machine.

Installation
Clone the repository: git clone https://github.com/Goobber33/Chatbot-Back-End.git

Create a virtual environment: python3 -m venv venv

Activate the virtual environment:

For Windows: .\venv\Scripts\activate
For macOS/Linux:
Install Python dependencies: pip3 install -r requirements.txt

Install Node.js dependencies: npm install

Configuration
Create a .env file in the root directory of the project and add the following environment variables:

OPENAI_API_KEY=your_openai_api_key OPENWEATHER_API_KEY=your_openweather_api_key ALPHA_ADVANTAGE_API_KEY=your_alpha_advantage_api_key

Replace your_openai_api_key, your_openweather_api_key, and your_alpha_advantage_api_key with your actual API keys.

Running the Back-End Server 🚦
To start the back-end server, run the following command: npm start

This will start both the Python and Node.js servers.

API Endpoints 🌐
POST /api/v1/ask_openai: Send a user query to the OpenAI API and receive a response in natural language.
GET /api/v1/weather/:location: Fetch weather information for a specified location using the OpenWeather API.
GET /api/v1/stock/:symbol: Retrieve stock market data for a specified ticker symbol using the Alpha Advantage API.
Contributing 🤝
If you have suggestions or improvements, feel free to open an issue or create a pull request. Your contributions are always welcome!

License 📄
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments 🌟
OpenAI API
OpenWeather API
Alpha Advantage API
Heroku