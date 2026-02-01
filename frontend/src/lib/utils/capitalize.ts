export function capizalize(str: string, all = false): string {
  if (str.length === 0) return str;

  if (!all) return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  str.split(" ").forEach((word, index) => {
    if (all || index === 0) {
      str =
        str.substring(0, index) +
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase() +
        str.substring(index + word.length);
    }
  });

  return str;
}
