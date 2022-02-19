fs = require('fs');
fs.readFile('input_day2.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  let rg = /(\d*)-(\d*) ([a-z]): ([a-z]*)/;
  const arr = data.split('\n');

  let counter = 0;

  arr.forEach((item) => {
    if (!item) {
      return;
    }
    const [, fromStr, toStr, char, string] = rg.exec(item);
    const from = parseInt(fromStr);
    const to = parseInt(toStr);

    // Part ONE
    //const quantity = string.split('').filter((item) => item === char).length;
    // const quantity = string.split(char).length - 1;
    // if (quantity <= to && quantity >= from) {
    //   counter += 1;
    // }
    //
    //
    //
    //
    // Part TWO

    const first = string[from - 1] === char;
    const second = string[to - 1] === char;

    // X ^ Y
    // 1 ^ 1 == 0
    // 0 ^ 0 == 0
    // 1 ^ 0 == 1
    // 0 ^ 1 == 1

    if (first ^ second) {
      counter += 1;
    }

    // if ((first && !second) || (second && !first)) {
    //   counter += 1;
    // }
  });

  // 101 == 5
  // 100 == 4

  // 001 == 2^0 = 1
  // 010 == 2^1 = 2
  // 100 == 2^2 = 4
  // 1000 == 2^3 == 8



antlr
tiny parser generator

  {
    "expression": "sum(col1) + 4.5 * 234",
  },





  select sum(col1) + 4.5 * 234


  select grouping_id(), grouping(table.col1), grouping(table.col2), table.col1, table.col2, sum(table.m1)
  from table
  groupby ROLLUP(table.col1, table.col2)



  ---alternatieve sql


  col1  col2 sum()
  1     1     124135.23
  1     1     134124.13
  1     null  asdfasdf
  1     2


  data
  ------------------
  0, null, null, sum()
  2, 2, null, sum()




  select 0, sum(table.m1)
  from table

  union all

  select 2 , table.col1, sum(table.m1)
  from table
  group by table.col1

  union all

  select 3, table.col1, table.col2, sum(table.m1)
  from table
  groupby table.col1, table.col2

  1     0
  col1 col2

  00
  10
  11

  ()
  (col1)
  (col1, col2)

  let number = 65;

  let x = number << 1;

  let num = 7;
  let num2 = 2;

  if (num & num2) {
  }

  console.log([2, 2, 4, 6, 7].reduce((prev, it) => prev ^ it));

  console.log('Valid:', counter);
  console.log('x:', x);
});
