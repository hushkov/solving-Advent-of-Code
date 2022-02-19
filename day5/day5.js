fs = require('fs');
fs.readFile('input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const arr = data.split('\n');

  const sorted = arr
    .slice(0, -1)
    .map(getSeatId2)
    .sort((a, b) => (a > b ? 1 : -1));

  const result = sorted.reduce(
    (acc, item) => {
      const [prev, found] = acc;
      if (prev === -1) {
        return [item, found];
      } else {
        if (found === -1 && item - prev === 2) {
          return [item, prev + 1];
        } else {
          return [item, found];
        }
      }
    },
    [-1, -1]
  );

  console.log(result);
  // console.log(Math.max(...mapped));
  // sorted.reduce((acc, item) => {
  //   if (item - acc === 2) {
  //     console.log(item, acc);
  //   }
  //   acc = item;
  //   return acc;
  // }, 0);
});

function getSeatId(string) {
  const row = string.slice(0, 7);
  const col = string.slice(-3);

  return getRow(row) * 8 + getCol(col);
}

function getRow(str) {
  let left = 0;
  let right = 128;

  str.split('').forEach((char) => {
    if (char === 'F') {
      right = Math.floor((right + left) / 2);
    } else {
      left = Math.floor((right + left) / 2);
    }
  });

  return left;
}

function getCol(str) {
  let left = 0;
  let right = 8;

  str.split('').forEach((char) => {
    if (char === 'L') {
      right = Math.floor((right + left) / 2);
    } else {
      left = Math.floor((right + left) / 2);
    }
  });

  return left;
}

function getSeatId2(str) {
  const toInt = (a, maxCh) => {
    return parseInt(
      a
        .split('')
        .map((ch) => (ch === maxCh ? 1 : 0))
        .join(''),
      2
    );
  };

  const row = toInt(str.slice(0, 7), 'B');
  const col = toInt(str.slice(-3), 'R');

  // console.log(row, col);

  return row * 8 + col;
}

//IEEE 754
//

// FBFBBFF
// 0101100 => 2,3,5 => 2^2 + 2^3 + 2^5 = 4 + 8 + 32 = 44
// 101 => 5

// RLR;

//console.log(0.1 + 0.2);
//0.300000000000000324
//newNumer(0.1) + newNumber(0.3) = newNumer(0.3)
