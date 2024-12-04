import { row2col } from "../utils/utils";

const input = Bun.file("input.txt");

const raw = await input.text();
const lines = raw.split("\n");

const vert = row2col<string>(lines.map((el) => el.split(""))).map((el) =>
  el.join("")
);

const sumHorizontal = findXMAS(lines);
const sumVertical = findXMAS(vert);
const sumDiagonal = findXMAS(getDiagonals(lines));

const part1 = sumHorizontal + sumVertical + sumDiagonal;

console.log("🚀 ~ part1:", part1); // 2591

function findXMAS(input: string[]) {
  return input.reduce((prev, curr) => {
    const pattern = /XMAS/g;
    const currPlusReversed = curr + "#" + curr.split("").reverse().join("");
    const matches = currPlusReversed.match(pattern);

    return prev + (matches?.length ?? 0);
  }, 0);
}

function getDiagonals(grid: string[]) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  const diagonals = [];

  // Top-left to bottom-right diagonals
  for (let col = 0; col < numCols; col++) {
    const diagonal = [];
    let row = 0,
      currentCol = col;
    while (row < numRows && currentCol < numCols) {
      diagonal.push(grid[row][currentCol]);
      row++;
      currentCol++;
    }
    diagonals.push(diagonal.join(""));
  }

  for (let row = 1; row < numRows; row++) {
    const diagonal = [];
    let currentRow = row,
      col = 0;
    while (currentRow < numRows && col < numCols) {
      diagonal.push(grid[currentRow][col]);
      currentRow++;
      col++;
    }
    diagonals.push(diagonal.join(""));
  }

  // Top-right to bottom-left diagonals
  for (let col = numCols - 1; col >= 0; col--) {
    const diagonal = [];
    let row = 0,
      currentCol = col;
    while (row < numRows && currentCol >= 0) {
      diagonal.push(grid[row][currentCol]);
      row++;
      currentCol--;
    }
    diagonals.push(diagonal.join(""));
  }

  for (let row = 1; row < numRows; row++) {
    const diagonal = [];
    let currentRow = row,
      col = numCols - 1;
    while (currentRow < numRows && col >= 0) {
      diagonal.push(grid[currentRow][col]);
      currentRow++;
      col--;
    }
    diagonals.push(diagonal.join(""));
  }

  return diagonals;
}

// Part 2

const validCombinations = ["MSAMS", "MMASS", "SMASM", "SSAMM"];
const rows = lines.length;
const cols = lines[0].length;

let part2 = 0;
for (let i = 0; i < rows - 2; i++) {
  for (let j = 0; j < cols - 2; j++) {
    const searchBox = [
      lines[i][j] + lines[i][j + 2],
      lines[i + 1][j + 1],
      lines[i + 2][j] + lines[i + 2][j + 2],
    ];
    if (validCombinations.includes(searchBox.join(""))) part2++;
  }
}
console.log("🚀 ~ part2:", part2); // 1880
