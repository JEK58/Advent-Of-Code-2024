const input = Bun.file("input.txt");

const l: number[] = [];
const r: number[] = [];

const lines = (await input.text()).split("\n");

lines.forEach((el) => {
  const [a, b] = el.split("   ");
  l.push(Number(a));
  r.push(Number(b));
});

l.sort((a, b) => a - b);
r.sort((a, b) => a - b);

const sum = l.reduce((prev, curr, idx) => prev + Math.abs(curr - r[idx]));

const sim = l.reduce(
  (prev, curr) => prev + r.filter((val) => val == curr).length * curr
);

console.log("🚀 ~ sum:", sum); // 1879048
console.log("🚀 ~ sim:", sim); // 21024792
