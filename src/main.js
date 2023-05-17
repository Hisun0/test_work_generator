const { getUserVariant, getValuesFromTask } = require('./math_solution/variant.js');

const userVariant = getUserVariant();
const valuesFromTask = getValuesFromTask(userVariant);

const documentDefinition = () => ({
  content: [
    { text: 'Проверочная работа 4', style: 'header' },
    { text: `Вариант ${userVariant}` }
  ],

  styles: {
    header: {
      fontSize: 22,
      bold: true,
      alignment: 'center',
    },
    anotherStyle: {
      alignment: 'center',
      fontSize: 16,
    }
  }
});
  
module.exports = documentDefinition;
