import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-A9ORepZ8gg5SyIOcbdGyFPS9",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
