const _ = require('lodash');
const getValuesFromTask = require('./variant.js');

const valuesFromTask = getValuesFromTask('4');

const getChanceWhenAllNegative = (negativeChance) => Number((negativeChance ** 3).toFixed(3));

const getChanceWhenOnePositive = (positiveChance, negativeChance) => {
  const multiplication = positiveChance * negativeChance * negativeChance;
  const result = (multiplication + multiplication + multiplication).toFixed(3);
  return Number(result);
};

const getChanceWhenTwoPositive = (positiveChance, negativeChance) => {
  const multiplication = positiveChance * positiveChance * negativeChance;
  const result = (multiplication + multiplication + multiplication).toFixed(3);
  return Number(result);
};

const getChanceWhenAllPositive = (positiveChance) => Number((positiveChance ** 3).toFixed(3));

const firstTask = (taskNums) => {
  const [ positiveChance, negativeChance ] = taskNums;
  const chanceWhenAllNegative = getChanceWhenAllNegative(negativeChance);
  const chanceWhenOnePositive = getChanceWhenOnePositive(positiveChance, negativeChance);
  const chanceWhenTwoPositive = getChanceWhenTwoPositive(positiveChance, negativeChance);
  const chanceWhenAllPositive = getChanceWhenAllPositive(positiveChance);
  return {
    0: chanceWhenAllNegative,
    1: chanceWhenOnePositive,
    2: chanceWhenTwoPositive,
    3: chanceWhenAllPositive,
  };
};

const calculateMathWait = (data) => {
  const result = Object.entries(data).reduce((acc, [ attempt, value ]) => {
    acc.push(attempt * value);
    return acc;
  }, []);
  return (_.sum(result)).toFixed(3);
};

const calculateDispertion = (data) => {
  const mathWait = calculateMathWait(data);
  const squares = Object.entries(data).reduce((acc, [ attempt, value ]) => {
    acc.push((attempt ** 2) * value);
    return acc;
  }, []);
  const sumSquares = _.sum(squares);
  return (sumSquares - (mathWait ** 2)).toFixed(3);
};

const calculateStandartDeviation = (dispertion) => (Math.sqrt(dispertion)).toFixed(3);

const thirdTask = () => {
  return;
};

console.log(firstTask(valuesFromTask))

module.exports = firstTask;
