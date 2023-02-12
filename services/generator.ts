import axios from 'axios';

export async function generateCoverLetter(prompt: string) {
  const { Configuration, OpenAIApi } = require('openai');
  const configuration = new Configuration({
    apiKey: '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'
  });
  const openai = new OpenAIApi(configuration);
  try{

    const response = await openai.createCompletion({
      model: 'text-curie-001',
      prompt,
      temperature: 0.6,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1
    });
  console.log("response: ", response)
    return response;
  }catch(error){
    console.log(error)
  }
}
