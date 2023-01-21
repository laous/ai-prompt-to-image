import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  //   basePath: "https://api.openai.com/v1",
});

export const openai = new OpenAIApi(config);
