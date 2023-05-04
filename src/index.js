const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const run = async () => {
    const prompt = `
    Представь, что ты студент, которому нужно сделать проверочную работу по математике.
    В одном из заданий нужно вычислить дисперсию ряда чисел. Как ты объяснишь свое решение преподавателю?
    Ответ на мой вопрос отправь в JSON-формате, который можно парсить. Выглядеть это должно следующим образом:

    {
        "answer": "answer", 
    }
    `;

    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 2048,
        temperature: 1,
    });

    const json = JSON.parse(response.data.choices[0].text);
    console.log(json.answer);
};

run();
