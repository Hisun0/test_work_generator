const getChartImage = (variant) => {
  switch (variant) {
    case '1':
      return { image: '../../images/chart1.png' };
    case '2':
      return { image: '../../images/chart2.png' };
    case '3':
      return { image: '../../images/chart3.png' };
    case '4':
      return { image: '../../images/chart4.png' };
  }
};

module.exports = getChartImage;
