import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { getPrompt } from './prompt';
const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

// 从环境变量中获取 OpenAI API 密钥
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error('OpenAI API key is not defined');
}
console.log('OPENAI_API_KEY', OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  organization: 'org-NXv2lDTvKYa3NmSVptChJXli',
  baseURL: 'https://api.openai.com',
  dangerouslyAllowBrowser: true,
});

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      //   const { prompt } = req.body;
      const body = await req.json();
      const question = getPrompt(body);

      debugger;

      // 调用 OpenAI API
      const response = await openai.chat.completions.create({
        model: model,
        messages: [{ role: 'user', content: question }],
      });

      res.status(200).json({ result: response });
    } catch (error) {
      console.error('OpenAI API 错误:', error);
      res.status(500).json({ error: '调用 OpenAI API 失败' });
    }
  } else {
    res.status(405).json({ error: '方法不被允许' });
  }
};

export default handler;
