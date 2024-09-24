export const IntlConvertPrice = (value: number | string) => {
  return new Intl.NumberFormat("en-EN").format(Number(value));
};

export const convertNumber = (amount: number) => {
  if (isNaN(amount)) return "Not a Number";
  let price = "";
  const reverseNumber = amount.toString().split("").reverse().join("");
  const arrReverseNumber = Array.from(Array(reverseNumber.length).keys());
  arrReverseNumber.map((index) => {
    if (index % 3 === 0) price += reverseNumber.substr(index, 3) + ".";
  });

  return `${price
    .split("", price.length - 1)
    .reverse()
    .join("")}`;
};
