const getValuesFromTask = require('../math_solution/variant.js');
const firstTask = require('../math_solution/math.js');

const valuesFromTask = getValuesFromTask('4');
const obj = firstTask(valuesFromTask);
const labels = Object.keys(obj);
const series = Object.values(obj);

console.log(labels, series);

const data = {
  labels: labels,
  series: [series],
};

new Chartist.Line('.chart', data);
