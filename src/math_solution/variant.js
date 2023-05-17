const variant = '2';

const getValuesFromTask = (variant) => {
  switch (variant) {
    case '1':
      return [1 / 6, 5 / 6];
    case '2':
      return [0.4, 0.6];
    case '3':
      return [0.88, 0.12];
    case '4':
      return [0.5, 0.5];
    default:
      throw new Error('Варианта не существует!');
  }
};

module.exports = {
  getValuesFromTask,
  variant,
};
