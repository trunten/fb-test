import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: process.env.REACT_APP_OPENAI_ORGANIZATION,
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export async function Chatbot(query, callback) {
  if (!query) { return; }
  query = query.replace(/@bot/ig, "");
  if (query.replaceAll(" ","").length === 0) { query = "Hello"; }
  const openai = new OpenAIApi(configuration);
  
  try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: query}],
      });
    const text = completion.data.choices[0].message.content;
    callback(text);
  } catch(e) {
    const text = "Sorry I'm a bit tired right now. Try again next month 😴"
    callback(text);
  }
}

export async function WeatherBot(callback) {
  const key ="2ZQRSVF6JFPA239FUT6U6WBL5";
  const url = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const response = await fetch(url)
  const { latitude, longitude } = await response.json();
  const weatherResponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&key=${key}&contentType=json`)
  const weather = await weatherResponse.json()
  const { temp, icon, conditions } = weather.currentConditions;
  return { temp, icon, conditions };
}