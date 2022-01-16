function getDeclension(value, words) {
  const absValue = Math.abs(value) % 100;
  const num = absValue % 10;

  if (absValue > 10 && absValue < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];

  return words[2];
}

export default getDeclension;
