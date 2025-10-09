module.exports = {
  lengthOfList: (list = []) => list.length,

  eq: (val1, val2) => val1 === val2,

  dateString: isoString => {
    if (!isoString) return '날짜 없음';
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? '잘못된 날짜' : date.toLocaleDateString();
  },
};
