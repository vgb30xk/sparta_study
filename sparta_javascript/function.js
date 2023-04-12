let dots = [
  [0, 0],
  [1, 0],
];

function change(x, y) {
  let temp;
  temp = y[1][0];
  y[1][0] = x[0][0];
  x[0][0] = temp;

  return x, y;
}
console.log(change(dots[0], dots[1]));
