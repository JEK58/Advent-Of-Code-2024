const input = Bun.file("input.txt");

const mem = await input.text();

const pattern = /mul\(\d+,\d+\)/g;
const matches = mem.match(pattern);

const part1 = matches?.reduce((prev, curr) => prev + calculate(curr), 0);

const pattern2 = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
const matches2 = mem.match(pattern2);

let multiply = true;
const part2 = matches2?.reduce((prev, curr) => {
  if (curr == "do()") {
    multiply = true;
    return prev;
  }
  if (curr == "don't()") {
    multiply = false;
    return prev;
  }
  if (!multiply) return prev;

  return prev + calculate(curr);
}, 0);

function calculate(input: string) {
  const [a, b] = input
    .replaceAll("mul", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .split(",");

  return +a * +b;
}

console.log("🚀 ~ part 1:", part1); // 173517243
console.log("🚀 ~ part 2:", part2); // 100450138
