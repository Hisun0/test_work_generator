const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const { variant, getValuesFromTask } = require('../math_solution/variant.js');
const { firstTaskForPdf, firstTask, thirdTask, calculateDispersion } = require('../math_solution/math.js');
const run = require('../openai.js');
const getChartImage = require('../chart_image.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const makePdf = async () => {
  const openaiResponse = await run();
  const userValues = getValuesFromTask(variant);
  const firstTaskObj = firstTaskForPdf(userValues);
  const objWithAnswers = firstTask(userValues);
  const attempts = Object.keys(objWithAnswers);
  const values = Object.values(objWithAnswers);
  const [ distributionResult, numericalChar ] = thirdTask(objWithAnswers);
  const [ , sumSquares ] = calculateDispersion(objWithAnswers);

  const docDefinition = {
    content: [
      { text: 'Проверочная работа 4', style: 'header' },
      { text: `Вариант ${variant}`, style: 'variantStyle' },
      { text: 'Задание 1', style: 'taskStyle' },
      { text: openaiResponse.task1, style: 'margin' },
      { text: `1) ${firstTaskObj.firstEvent}
      2) ${firstTaskObj.secondEvent}
      3) ${firstTaskObj.thirdEvent}
      4) ${firstTaskObj.fourthEvent}`, style: 'margin' },
      { table: {
        body: [
          attempts,
          values,
        ]
      }, style: 'margin' },
      { text: 'Задание 2', style: 'taskStyle' },
      { text: 'Основываясь на таблице из 1 задания, был построен следующий многоугольник распределения случайной величины:', style: 'margin' },
      { image: getChartImage(variant), width: 400, height: 300, style: 'margin'},
      { text: 'Задание 3', style: 'taskStyle' },
      { text: 'Функция распредения случайной величины:', bold: true, style: 'margin' },
      { text: openaiResponse.task2, margin: [0, 0, 0, 10] },
      { text: `${distributionResult[0]}
      ${distributionResult[1]}
      ${distributionResult[2]} (${values[0]} + ${values[1]})
      ${distributionResult[3]} (${values[0] + values[1]} + ${values[2]})
      ${distributionResult[4]} (${values[0] + values[1] + values[2]} + ${values[3]})` },
      { text: 'Числовые характеристики:', bold: true, style: 'margin' },
      { text: openaiResponse.task3, margin: [0, 0, 0, 10] },
      { text: `M(x) = ${attempts[0]} * ${values[0]} + ${attempts[1]} * ${values[1]} + ${attempts[2]} * ${values[2]} + ${attempts[3]} * ${values[3]} = ${numericalChar.mathWait}` },
      { text: `Ответ: ${numericalChar.mathWait}` },
      { text: openaiResponse.task4, margin: [0, 0, 0, 10] },
      { text: `D(x) = M(x²) - (M(x))²`, margin: [0, 10, 0, 0] },
      { text: `M(x²) = ${attempts[0]}² * ${values[0]} + ${attempts[1]}² * ${values[1]} + ${attempts[2]}² * ${values[2]} + ${attempts[3]}² * ${values[3]} = ${sumSquares}` },
      { text: `D(x) = ${sumSquares} - (${numericalChar.mathWait})² = ${numericalChar.dispersion}` },
      { text: `Ответ: ${numericalChar.dispersion}` },
      { text: openaiResponse.task5, margin: [0, 0, 0, 10] },
      { text: `G(x) = √D(x)`, margin: [0, 10, 0, 0] },
      { text: `G(x) = √${numericalChar.dispersion} = ${numericalChar.standartDeviation}` },
      { text: `Ответ: ${numericalChar.standartDeviation}` },

    ],
  
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        alignment: 'center',
      },
      variantStyle: {
        alignment: 'center',
        fontSize: 18,
        margin: [0, 10, 0, 10]
      },
      taskStyle: {
        alignment: 'left',
        fontSize: 16,
        bold: true,
      },
      margin: {
        margin: [0, 10, 0, 10]
      }
    }
  };
  pdfMake.createPdf(docDefinition).download('rabota.pdf');
};

makePdf();
