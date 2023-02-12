import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';

export const openaiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log('I AM REACHING HERE: ', req.method, req.body);
  if (req.method === 'POST') {
    const prompt = req.body;
    // Process a POST request
    try {
      const { Configuration, OpenAIApi } = require('openai');
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
      });
      const openai = new OpenAIApi(configuration);
      console.log(openai);
      openai
        .createCompletion({
          model: 'text-davinci-003',
          prompt: 'Brainstorm some ideas combining VR and fitness:',
          temperature: 0.6,
          max_tokens: 150,
          top_p: 1,
          frequency_penalty: 1,
          presence_penalty: 1
        })
        .then((data: any) => console.log(data.data));
    } catch (err: any) {
      res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  } else {
    // Handle any other HTTP method
  }
};

export default openaiHandler;
