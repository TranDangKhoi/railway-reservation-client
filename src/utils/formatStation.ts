export function getFirstLetters(str?: string) {
  if (str) {
    const firstLetters = str
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");
    return firstLetters;
  }
}
