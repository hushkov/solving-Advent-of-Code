fs = require('fs');
fs.readFile('input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  let lines = data.split('\n');
  lines = lines.slice(0, lines.length - 1);

  const result = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
    .map(([x, y]) => CountRec(0, 0, x, y, lines, 0))
    .reduce((acc, item) => {
      console.log('Item', item, acc);
      return acc * item;
    });

  //   const result =
  //     Count(1, 1, lines) *
  //     Count(3, 1, lines) *
  //     Count(5, 1, lines) *
  //     Count(7, 1, lines) *
  //     Count(1, 2, lines);

  console.log('Trees:', result);
});

function Count(right, down, lines) {
  let counter = 0;
  let stepRight = 0;
  let stepDown = 0;

  for (let index = 0; index < lines.length; index += down) {
    const str = lines[index];

    if (str[stepRight] === '#') {
      counter += 1;
    }

    stepRight = (stepRight + right) % str.length;
    stepDown += down;
  }
  console.log(counter);
  return counter;
}

// exit point
// unique params
// no global state

// mult(0, 6, 4);
// function mult(acc, left, right) {
//     if (right = 0)
//     {
//         return acc;
//     } else if (right == 2) {
//         return mult(acc + left, right - 1);
//     } else {
//         return mult();
//     }
// }
//

function CountRec(x, y, dx, dy, lines, countOfTrees) {
  if (y >= lines.length) {
    return countOfTrees;
  } else {
    let line = lines[y];

    let nextX = (x + dx) % line.length;
    let nextY = y + dy;

    let nextCountOfTrees = line[x] === '#' ? countOfTrees + 1 : countOfTrees;

    return CountRec(nextX, nextY, dx, dy, lines, nextCountOfTrees);
  }
}

// function generate(left, right) {
//   let number = 0;

//   const random = Math.floor(Math.random() * 1000);

//   console.log('LOL', (random % right) + left);

//   return number;
// }

// generate(4, 14);
