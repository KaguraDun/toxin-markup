function getDeclension(value, words) {
  const absValue = Math.abs(value) % 100;
  const number = absValue % 10;

  const absValueInRangeTenTwenty = absValue > 10 && absValue < 20;
  const numberInRangeOneFive = number > 1 && number < 5;

  if (absValueInRangeTenTwenty) return words[2];
  if (numberInRangeOneFive) return words[1];
  if (number === 1) return words[0];

  return words[2];
}

export default getDeclension;
