import openai
import requests
import os
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS
from flask import jsonify

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
OPENWEATHERMAP_API_KEY = os.getenv("OPENWEATHERMAP_API_KEY")

app = Flask(__name__)
CORS(app, resources={r"/chatbot": {"origins": "*"}})

def get_weather(city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHERMAP_API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    if data["cod"] == 200:
        weather_description = data["weather"][0]["description"]
        temperature = data["main"]["temp"]
        return f"The weather in {city} is {weather_description} with a temperature of {temperature}°C."
    else:
        return f"Sorry, I could not find weather information for {city}."

def get_response(prompt):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.7,
    )
    return response.choices[0].text.strip()

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_input = request.form['userInput']
    if user_input.lower() == "exit":
        response = "Goodbye!"
    elif user_input.lower().startswith("weather"):
        city = user_input.split(" ", 1)[1]
        response = get_weather(city)
    else:
        prompt = f"User: {user_input}\nChatbot:"
        response = get_response(prompt)

    # Return response with Access-Control-Allow-Origin header
    return jsonify({'response': response}), 200

if __name__ == '__main__':
    app.run(debug=True)