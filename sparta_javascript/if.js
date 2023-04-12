function solution(cipher, code) {
  let arr = [];
  for (let i = 1; i < cipher.length; i++) {
    if (cipher[i * code - 1] === undefined) break;
    arr.push(cipher[i * code - 1]);
  }

  return console.log(arr.join(""));
}

solution("dfjardstddetckdaccccdegkeee qqq", 4);
