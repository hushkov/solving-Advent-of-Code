const { group } = require('console');

fs = require('fs');
fs.readFile('input2.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  const groups = data.split('\n\n');

  // let t = groups.map((str) => {
  //   console.log('STR', str.replace(/\n/g, ''));
  //   return str
  //     .replace(/\n/g, '')
  //     .split('')
  //     .reduce((acc, item) => {
  //       if (acc.con) acc.add(item);
  //       return acc;
  //     }, new Set()).size;
  // });

  let t = groups.map((str) => {
    const persons = str.split('\n');
    const resultSet = persons
      .filter((a) => a.length > 0)
      .map((onePersonStr) => {
        return onePersonStr.split('').reduce((acc, item) => {
          acc.add(item);
          return acc;
        }, new Set());
      })
      .reduce(intersection);

    return resultSet.size;
  });

  const summary = t.reduce((acc, item) => (acc += item));

  console.log(summary);
});

function intersection(setA, setB) {
  // console.log(setA.size, setB.size);
  let _intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}
// abc; 0
// bax; 1
// ab
// bcay; 1
//
//+1

// {
//         a: 3,
//         b: 1,
//         c: 1
// }

// res: 1
