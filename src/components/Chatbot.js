export default function Chatbot(query, callback) {
  if (!query) { return; }
  const text = "Just a test to see how this would work in practice"
  if (callback) {
    callback(text);
  }
  return text;
}