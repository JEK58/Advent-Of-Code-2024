const input = Bun.file("input.txt");

const raw = await input.text();
const map = raw.split("\n").map((el) => el.split(""));

const height = map.length;
const width = map[0].length;

const modes: Position[] = [];

type Antenna = {
  freq: string;
  y: number;
  x: number;
};

const antennas: Antenna[] = [];

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[0].length; x++) {
    if (map[y][x] != ".") antennas.push({ freq: map[y][x], y, x });
  }
}

for (const antenna of antennas) {
  for (const secAntenna of antennas) {
    if (antenna == secAntenna || antenna.freq != secAntenna.freq) continue;

    const distance = [antenna.x - secAntenna.x, antenna.y - secAntenna.y];

    const mode1: Position = [antenna.x + distance[0], antenna.y + distance[1]];
    const mode2: Position = [
      secAntenna.x - distance[0],
      secAntenna.y - distance[1],
    ];

    if (validConstraints(mode1)) modes.push(mode1);
    if (validConstraints(mode2)) modes.push(mode2);
  }
}
// Filter duplicates
const part1 = [...new Set(modes.map((mode) => mode.join(",")))].length;

console.log("🚀 ~ part1:", part1); // 311

const modes2: number[][] = [];
type Position = [number, number];

for (const antenna of antennas) {
  for (const secAntenna of antennas) {
    if (antenna == secAntenna || antenna.freq != secAntenna.freq) continue;

    const distance: Position = [
      antenna.x - secAntenna.x,
      antenna.y - secAntenna.y,
    ];

    function addMode1(mode: Position, distance: Position): Position {
      return [mode[0] + distance[0], mode[1] + distance[1]];
    }

    function addMode2(mode: Position, distance: Position): Position {
      return [mode[0] - distance[0], mode[1] - distance[1]];
    }

    let mode = addMode2([antenna.x, antenna.y], distance);

    while (validConstraints(mode)) {
      mode = addMode1(mode, distance);
      if (validConstraints(mode)) modes2.push(mode);
    }

    while (validConstraints(mode)) {
      mode = addMode2(mode, distance);
      if (validConstraints(mode)) modes2.push(mode);
    }

    if (validConstraints(mode)) modes2.push(mode);
    if (validConstraints(mode)) modes2.push(mode);
  }
}

// Filter duplicates
const part2 = [...new Set(modes2.map((mode) => mode.join(",")))].length;

console.log("🚀 ~ part2:", part2); // 1115

function validConstraints(mode: number[]) {
  return !(mode[0] < 0 || mode[0] >= width || mode[1] < 0 || mode[1] >= height);
}
