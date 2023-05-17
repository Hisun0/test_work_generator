const { Configuration, OpenAIApi } = require('openai');
const { firstTaskForPdf } = require('./math_solution/math.js');
const { variant, getValuesFromTask } = require('./math_solution/variant.js');

const config = new Configuration({
    apiKey: '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', //никогда не делайте так, ибо нельзя показывать свой апи ключ другим людям, но реп приватный мне пох
});

const openai = new OpenAIApi(config);

const run = async () => {
    const firstTaskObj = firstTaskForPdf(getValuesFromTask(variant));
    
    const prompt1 = `
    Представь, что ты студент, которому нужно сделать проверочную работу по математике.
    В задании нужно написать закон распределения случайной величины. Твое решение будет выглядеть вот так:
    1) ${firstTaskObj.firstEvent}
    2) ${firstTaskObj.secondEvent}
    3) ${firstTaskObj.thirdEvent}
    4) ${firstTaskObj.fourthEvent}
    Как ты объяснишь свое решение преподавателю?
    Ответ вопрос отправь в JSON-формате, который можно парсить. Нельзя использовать знак ":". 
    Выглядеть это должно следующим образом:

    {
        "answer": "answer", 
    }
    `;

    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt1,
        max_tokens: 2048,
        temperature: 1,
    });

    const json = JSON.parse(response.data.choices[0].text);
    return json.answer;
};

module.exports = run;
