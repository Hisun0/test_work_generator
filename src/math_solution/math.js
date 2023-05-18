const _ = require('lodash');

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

const firstTaskForPdf = (taskNums) => {
  const [ positiveChance, negativeChance ] = taskNums;
  const chanceWhenAllNegative = getChanceWhenAllNegative(negativeChance);
  const chanceWhenOnePositive = getChanceWhenOnePositive(positiveChance, negativeChance);
  const chanceWhenTwoPositive = getChanceWhenTwoPositive(positiveChance, negativeChance);
  const chanceWhenAllPositive = getChanceWhenAllPositive(positiveChance);
  return {
    firstEvent: `${negativeChance} * ${negativeChance} * ${negativeChance} = ${chanceWhenAllNegative}`,
    secondEvent: `${positiveChance} * ${negativeChance} * ${negativeChance} + ${negativeChance} * ${positiveChance} * ${negativeChance} + ${negativeChance} * ${negativeChance} * ${positiveChance} = ${chanceWhenOnePositive}`,
    thirdEvent: `${positiveChance} * ${positiveChance} * ${negativeChance} + ${positiveChance} * ${negativeChance} * ${positiveChance} + ${negativeChance} * ${positiveChance} * ${positiveChance} = ${chanceWhenTwoPositive}`,
    fourthEvent: `${positiveChance} * ${positiveChance} * ${positiveChance} = ${chanceWhenAllPositive}`,
  };
};

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
  const arrWithMultiplication = Object.entries(data).reduce((acc, [ attempt, value ]) => {
    acc.push(attempt * value);
    return acc;
  }, []);
  const result = (_.sum(arrWithMultiplication)).toFixed(3);
  return result;
};

const calculateDispersion = (data) => {
  const mathWait = calculateMathWait(data);
  const squares = Object.entries(data).reduce((acc, [ attempt, value ]) => {
    acc.push((attempt ** 2) * value);
    return acc;
  }, []);
  const sumSquares = _.sum(squares);
  const result = (sumSquares - (mathWait ** 2)).toFixed(3);
  return [result, sumSquares];
};

const calculateStandartDeviation = (dispersion) => {
  const result = (Math.sqrt(dispersion)).toFixed(3);
  return result;
};

const makeDistributionOfARandomVariable = (entries) => {
  const result = {};
  let i = 0;
  const acc = [];
  result[0] = '0 если x ≤ 0';
  for (let [ , value ] of entries) {
    if (result.length === 4) break;
    acc.push(value);
    result[i + 1] = `${(_.sum(acc)).toFixed(3)} если ${i} < x ≤ ${i + 1}`;
    i += 1;
  }
  result[4] = '1 если x > 3';
  return result
};

const thirdTask = (data) => {
  const entries = Object.entries(data);
  const distributionResult = makeDistributionOfARandomVariable(entries);
  const numericalChar = {
    mathWait: calculateMathWait(data),
    dispersion: calculateDispersion(data)[0],
    standartDeviation: calculateStandartDeviation(calculateDispersion(data)[0]),
  };
  return [distributionResult, numericalChar];
};

module.exports = {
  firstTask,
  firstTaskForPdf,
  thirdTask,
  calculateDispersion,
  calculateMathWait,
  calculateStandartDeviation,
};
