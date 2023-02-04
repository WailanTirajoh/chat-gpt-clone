import { Configuration, OpenAIApi } from "openai";
const config = useRuntimeConfig();
const configuration = new Configuration({
  apiKey: config.openApiKey,
});
const openai = new OpenAIApi(configuration);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!configuration.apiKey) {
    return {
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    };
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: body.message,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    return {
      message: "Success",
      data: {
        message: completion.data.choices[0].text?.trim(),
      },
    };
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      setResponseStatus(error.response.status, error.response.data);
    } else {
      setResponseStatus(500, "An error occurred during your request.");
    }
  }
});
