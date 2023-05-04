const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({
    apiKey: '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', //никогда не делайте так, ибо нельзя показывать свой апи ключ другим людям, но реп приватный мне пох
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
