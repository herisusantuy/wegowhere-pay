export function maskNumber(number: number): string {
  const numString: string = number.toString();
  const maskedPart: string = numString
    .slice(-4)
    .padStart(numString.length, ".");
  return maskedPart.replace(/.{4}(?=.)/g, "$& ");
}
