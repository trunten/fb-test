import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-gybCGKm4ELCFqviRgMMUcoay",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export default async function Chatbot(query, callback) {
  if (!query) { return; }
  query = query.replace(/@bot/ig, "");
  const openai = new OpenAIApi(configuration);
  
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: query}],
  });
  const text = completion.data.choices[0].message.content;
  callback(text);
}