import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const callGPT_API = async (name: string): Promise<string> => {
  console.log("api_key", API_KEY);
  console.log("prompt", prompt);
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: "Give me 3 possible pet names for " + name,
      model: "text-davinci-003",
      temperature: 0.8,
      max_tokens: 100,
    },
    { headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` } }
  );
  //   console.log(response.data.choices[0]);
  return response.data.choices[0].text;
};

export default callGPT_API;
