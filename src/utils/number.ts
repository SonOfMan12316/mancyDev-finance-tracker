export const formatPrice = (number: number): number | string => {
  if (!number) return `${number}`;
  return number.toFixed(2);
};

export const addCommasToNumber = (
  number: number | `${number}` | string
): string => {
  if (!number) return `${number}`;

  const [integerPart, decimalPart] = number.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export const addPlusSignToNonNegativeNumber = (
  number: number
): number | string => {
  if (Math.sign(number) !== -1) {
    return "+" + number;
  } else {
    return number;
  }
};

export const formatNumberShort = (num: number) =>  {
  if (num >= 10000) {
    const rounded = Math.floor(num / 100) / 10;
    return Number.isInteger(rounded) ? `${rounded}k` : `${rounded.toFixed(1)}k`;
  }
  return num.toLocaleString();
}
