// TODO: Tooooo slow!

const input = Bun.file("input.txt");

const raw = await input.text();
const diskmap = raw.split("");

const disk: string[] = [];
let id = 0;

for (let i = 0; i < diskmap.length; i++) {
  const input = diskmap[i];

  if (i % 2 == 0) {
    disk.push(...Array.from({ length: +input }, () => id.toString()));
    id++;
  }

  if (i % 2 == 1) disk.push(...Array.from({ length: +input }, () => "."));
}

const diskCopy = [...disk];

let firstFreeSpace = 0;
let lastBlock = Number.MAX_SAFE_INTEGER;

while (firstFreeSpace < lastBlock) {
  firstFreeSpace = disk.findIndex((el) => el == ".");
  lastBlock = disk.findLastIndex((el) => el != ".");

  disk[firstFreeSpace] = disk[lastBlock];
  disk[lastBlock] = ".";
}

const checksum = disk
  .filter((el) => el != ".")
  .reduce((prev, curr, idx) => prev + +curr * idx, 0);

console.log("🚀 ~ checksum part 1:", checksum); // 6366665108136

// Part 2

const ids = new Set([...diskCopy.filter((el) => el != ".").reverse()]);

for (const id of ids) {
  ids.delete(id);
  const firstCurrIdx = diskCopy.findIndex((el) => el === id);
  const currLength = diskCopy.filter((el) => el == id).length;

  const freeBlock = findFreeSpace(currLength, diskCopy);

  if (freeBlock && freeBlock < firstCurrIdx)
    switchBlocks(diskCopy, currLength, firstCurrIdx, freeBlock);
}

const checksum2 = diskCopy.reduce((prev, curr, idx) => {
  if (curr != ".") return prev + +curr * idx;
  return prev;
}, 0);

console.log("🚀 ~ checksum part 2:", checksum2); // 6398065450842

function switchBlocks(
  disk: string[],
  length: number,
  idIdx: number,
  firstFree: number
) {
  const temp = disk.slice(idIdx, idIdx + length);
  disk.splice(idIdx, length, ...disk.slice(firstFree, firstFree + length));
  disk.splice(firstFree, length, ...temp);
}

function findFreeSpace(size: number, disk: string[]) {
  let currentStartIdx = undefined;
  let currentItem = undefined;
  let firstFreeBlock = undefined;
  for (let i = 0; i < disk.length; i++) {
    currentItem = disk[i];
    if (currentItem != ".") currentStartIdx = undefined;
    if (!currentStartIdx && currentItem == ".") currentStartIdx = i;

    if (
      currentStartIdx &&
      currentItem === "." &&
      i - currentStartIdx >= size - 1
    ) {
      firstFreeBlock = currentStartIdx;
      break;
    }
  }
  return firstFreeBlock;
}
