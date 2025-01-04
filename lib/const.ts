export const searchSubstring = (text: string, pattern: string): boolean => {
  const regExp = new RegExp(pattern, "i"); // "i" for case-insensitive matching
  return regExp.test(text);
};
