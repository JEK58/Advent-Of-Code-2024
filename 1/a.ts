const input = Bun.file("input.txt");

const l: number[] = [];
const r: number[] = [];

const lines = (await input.text()).split("\n");

lines.forEach((el) => {
  const [a, b] = el.split("   ");
  l.push(Number.parseInt(a));
  r.push(Number.parseInt(b));
});

l.sort((a, b) => a - b);
r.sort((a, b) => a - b);

const sum = l.reduce((prev, curr, idx) => {
  return prev + Math.abs(curr - r[idx]);
}, 0);

let sim = 0;
l.forEach((el) => {
  sim += r.filter((val) => val == el).length * el;
});

console.log("🚀 ~ sum:", sum); // 1879048
console.log("🚀 ~ sim:", sim); // 21024792
