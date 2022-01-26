function getFormattedPrice(price) {
  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace(/\s(?=[^.]$)/, '');

  return formattedPrice;
}

export default getFormattedPrice;
