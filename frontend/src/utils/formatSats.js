
const formatSats = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' sats';
}

const satsToBtc = (num) => {
  return (num / 100000000).toString() + ' btc';
}

const btcToSats = (num) => formatSats(num * 100000000)


const autoFormatAmt = (num) => {
  if (num / 100000000 > 1) {
    return satsToBtc(num)
  } else {
    return formatSats(num)
  }
}

const toggleFormatAmt = (str) => { // str: 123 btc or 123 sats, space in between
  const [currentAmt, currentFormat] = str.split(' ')
  if (currentFormat === 'sats') {
    return satsToBtc(Number(currentAmt.split(',').join('')))
  } else {
    return btcToSats(Number(currentAmt))
  }
}

export { autoFormatAmt, formatSats, satsToBtc, toggleFormatAmt }