import OpenAI from 'openai';
import cv from "@data/cv.json";
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey
});

export default async function handler(req, res) {

    const { question } = req.query;
    const prompt =  JSON.stringify({ personalDetails: cv, question, prompt: 'Answer the question from the perspective of the person described in personalDetails' })

    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
        });
        const { content } =  chatCompletion.choices[0].message;
        res.status(200).json({ answer: content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}
