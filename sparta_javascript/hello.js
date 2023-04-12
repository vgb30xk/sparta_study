function solution(strings, n) {
  strings.sort(function (a, b) {
    if (a[n] < b[n]) return -1;
    if (a[n] > b[n]) return 1;
    if (a[n] == b[n]) return 0;
  });

  console.log(strings);
  return;
}

solution(["abce", "abcd", "cdx"], 2);
