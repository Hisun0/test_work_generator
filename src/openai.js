const { Configuration, OpenAIApi } = require('openai');
const { firstTaskForPdf, thirdTask, firstTask, calculateDispersion } = require('./math_solution/math.js');
const { variant, getValuesFromTask } = require('./math_solution/variant.js');

const config = new Configuration({
    apiKey: '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', //никогда не делайте так, ибо нельзя показывать свой апи ключ другим людям, но реп приватный мне пох
});

const openai = new OpenAIApi(config);

const run = async () => {
    const userValues = getValuesFromTask(variant);
    const firstTaskObj = firstTaskForPdf(userValues);
    const objWithAnswers = firstTask(userValues);
    const attempts = Object.keys(objWithAnswers);
    const values = Object.values(objWithAnswers);
    const [ distributionResult, numericalChar ] = thirdTask(objWithAnswers);
    const [ , sumSquares ] = calculateDispersion(objWithAnswers);
    
    const prompt1 = `
    task1: Представь, что ты студент, которому нужно сделать проверочную работу по математике.
    В задании нужно написать закон распределения случайной величины. Твое решение будет выглядеть вот так:
    1) ${firstTaskObj.firstEvent}
    2) ${firstTaskObj.secondEvent}
    3) ${firstTaskObj.thirdEvent}
    4) ${firstTaskObj.fourthEvent}
    Как ты объяснишь свое решение преподавателю?

    task2: Представь, что ты студент, которому нужно сделать проверочную работу по математике.
    В задании нужно построить функцию распределения случайной величины. Твое решение будет выглядеть вот так:
    1) ${distributionResult[0]}
    2) ${distributionResult[1]}
    3) ${distributionResult[2]} (${values[0]} + ${values[1]})
    4) ${distributionResult[3]} (${values[0] + values[1]} + ${values[2]})
    5) ${distributionResult[4]} (${values[0] + values[1] + values[2]} + ${values[3]})
    Как ты объяснишь свое решение преподавателю?

    task3: Представь, что ты студент, которому нужно сделать проверочную работу по математике.
    В задании нужно вычислить математическое ожидание. Твое решение будет выглядеть вот так:
    M(x) = ${attempts[0]} * ${values[0]} + ${attempts[1]} * ${values[1]} + ${attempts[2]} * ${values[2]} + ${attempts[3]} * ${values[3]} = ${numericalChar.mathWait}
    Как ты объяснишь свое решение преподавателю?

    task4: Представь, что ты студент, которому нужно сделать проверочную работу по математике.
    В задании нужно вычислить дисперсию. Твое решение будет выглядеть вот так:
    1) D(x) = M(x²) - (M(x))²
    2) M(x²) = ${attempts[0]}² * ${values[0]} + ${attempts[1]}² * ${values[1]} + ${attempts[2]}² * ${values[2]} + ${attempts[3]}² * ${values[3]} = ${sumSquares}
    3) D(x) = ${sumSquares} - (${numericalChar.mathWait})² = ${numericalChar.dispersion}
    Как ты объяснишь свое решение преподавателю?

    task5: Представь, что ты студент, которому нужно сделать проверочную работу по математике.
    В задании нужно вычислить стандартное квадратичное отклонение. Твое решение будет выглядеть вот так:
    1) G(x) = √D(x)
    2) G(x) = √${numericalChar.dispersion} = ${numericalChar.standartDeviation}
    Как ты объяснишь свое решение преподавателю?

    Ответ на вопросы отправь в JSON-формате, который можно парсить. Нельзя использовать знак ":". 
    Выглядеть это должно следующим образом:

    {
        "task1": "solution",
        "task2": "solution",
        "task3": "solution",
        "task4": "solution",
        "task5": "solution",
    }
    `;

    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt1,
        max_tokens: 2048,
        temperature: 1,
    });

    const json = JSON.parse(response.data.choices[0].text);
    return json;
};

module.exports = run;
