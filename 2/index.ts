const input = Bun.file("input.txt");

const lines = (await input.text())
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const safeLines = lines.map((line) => isSafeLine(line)).filter((el) => !!el);

const safeLinesDampened = lines
  .map((line) => {
    if (isSafeLine(line)) return true;
    const variations = removeOneElementFromEveryCombination(line);
    return variations.map((el) => isSafeLine(el)).some((el) => !!el);
  })
  .filter((el) => !!el);

console.log("🚀 ~ safeLines:", safeLines.length); // 257
console.log("🚀 ~ safeLinesDampened:", safeLinesDampened.length); // 328

function isSafeLine(line: number[]) {
  const delta = line.slice(0, -1).map((el, idx) => el - line[idx + 1]);

  const allPositiveOrNegative =
    delta.every((el) => el > 0) || delta.every((el) => el < 0);

  if (!allPositiveOrNegative) return false;

  return delta.every((el) => Math.abs(el) <= 3);
}

function removeOneElementFromEveryCombination(input: number[]) {
  const result: number[][] = [];

  for (let i = 0; i < input.length; i++) {
    const current = [...input];
    current.splice(i, 1);
    result.push(current);
  }

  return result;
}
