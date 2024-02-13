export const hideEverySecondChar = (str) => {
  if(!str) return""
  let result = ""; // Initialize an empty string to store the result

  for (let i = 0; i < str.length; i++) {
    // Check if the current position should be replaced
    if ((i + 1) % 2 === 0) {
      result += "*"; // Add * for every second character
    } else {
      result += str[i]; // Otherwise, add the current character
    }
  }

  return result;
};
