import { row2col } from "../utils/utils";

const input = Bun.file("input.txt");

const raw = await input.text();
const [rawRules, rawUpdates] = raw.split("\n\n");

const rules = rawRules.split("\n").map((el) => el.split("|").map(Number));
const updates = rawUpdates.split("\n").map((el) => el.split(",").map(Number));

function checkIfValid(input: number[]) {
  const updated = new Set<number>();
  let valid = true;
  while (input.length && valid) {
    const page = input.shift();
    if (!page) continue;

    valid = !rules.some((el) => el[0] == page && updated.has(el[1]));

    updated.add(page);
  }
  return valid;
}

function checkIfValid2(input: number[]) {
  const updated = new Set<number>();
  let valid = 0;

  while (input.length && valid == 0) {
    const page = input.shift();
    if (!page) continue;

    const res = rules.find((el) => el[0] == page && updated.has(el[1]));

    if (res) valid = res[0];

    updated.add(page);
  }
  return valid;
}
const part1 = updates.reduce((prev, curr) => {
  return checkIfValid([...curr])
    ? prev + curr[Math.floor(curr.length / 2)]
    : prev;
}, 0);

const part2 = updates.reduce((prev, curr) => {
  if (checkIfValid([...curr])) return prev;
  let invalidPage = Number.MAX_SAFE_INTEGER;
  while (invalidPage != 0) {
    invalidPage = checkIfValid2([...curr]);

    // Move invalid page one index up (-1) (alter curr)
    const idx = curr.indexOf(invalidPage);
    if (idx !== -1) [curr[idx - 1], curr[idx]] = [curr[idx], curr[idx - 1]];
  }

  return prev + curr[Math.floor(curr.length / 2)];
}, 0);

console.log("🚀 ~ part1:", part1); // 4637
console.log("🚀 ~ part2:", part2); // 6370
