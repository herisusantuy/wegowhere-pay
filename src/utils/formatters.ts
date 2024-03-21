export function maskNumber(number: number): string {
  const numString: string = number.toString();
  const maskedPart: string = numString
    .slice(-4)
    .padStart(numString.length, ".");
  return maskedPart.replace(/.{4}(?=.)/g, "$& ");
}

export function cardNumberFormatter(
  oldValue: string,
  newValue: string
): string {
  if (oldValue.length > newValue.length) {
    return newValue;
  }
  return newValue
    .replace(/\W/gi, "")
    .replace(/(.{4})/g, "$1 ")
    .substring(0, 19);
}

export function expirationDateFormatter(
  oldValue: string,
  newValue: string
): string {
  if (oldValue.length > newValue.length) {
    return newValue;
  }
  return newValue
    .replace(/\W/gi, "")
    .replace(/(.{2})/g, "$1/")
    .substring(0, 5);
}

export function maskCreditCardNumber(creditCardNumber: string): string {
  const sanitizedNumber: string = creditCardNumber.replace(/\s/g, ""); // Remove spaces
  const maskedPart: string = sanitizedNumber
    .slice(-4)
    .padStart(sanitizedNumber.length, ".");
  return maskedPart.replace(/.{4}(?=.)/g, "$& ");
}
