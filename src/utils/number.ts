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
