import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const callGPT_API = async (name: string): Promise<string> => {
  try {
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
    console.log(response);
    return response.data.choices[0].text;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return "An Axios error occurred " + error.message;
    } else {
      return "An error occurred";
    }
  }
};

export default callGPT_API;
