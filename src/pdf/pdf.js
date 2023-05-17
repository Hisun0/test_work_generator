const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
const { variant, getValuesFromTask } = require('../math_solution/variant.js');
const { firstTaskForPdf, firstTask } = require('../math_solution/math.js');
//const getChartImage = require('../tree.js');
const run = require('../openai.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const makePdf = async () => {
  const text = await run();
  const firstTaskObj = firstTaskForPdf(getValuesFromTask(variant));
  const objWithAnswers = firstTask(getValuesFromTask(variant));

  const docDefinition = {
    content: [
      { text: 'Проверочная работа 4', style: 'header' },
      { text: `Вариант ${variant}`, style: 'variantStyle' },
      { text: 'Задание 1', style: 'taskStyle' },
      { text: text, style: 'margin' },
      { text: `1) ${firstTaskObj.firstEvent}
      2) ${firstTaskObj.secondEvent}
      3) ${firstTaskObj.thirdEvent}
      4) ${firstTaskObj.fourthEvent}`, style: 'margin' },
      { table: {
        body: [
          Object.keys(objWithAnswers),
          Object.values(objWithAnswers),
        ]
      }, style: 'margin' },
      { text: 'Задание 2', style: 'taskStyle' },
      { image: '../../images/chart2.png' },
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
