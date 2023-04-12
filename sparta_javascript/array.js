const rainbowColors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = 0;

for (const color of rainbowColors) {
  sum += color;
}

console.log(sum, sum / rainbowColors.length);
