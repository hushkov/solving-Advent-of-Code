fs = require('fs');

const jmp = 'jmp';
const acc = 'acc';
const nop = 'nop';

fs.readFile('input2.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const lines = data.split('\n').slice(0, -1);
  const allParsedCommands = lines.map(parse);
  const allParsedCommands2 = lines.map(parse);

  let accumulator = 0;
  let i = 0;

  // Part ONE
  // do {
  //   let step = allParsedCommands[i];
  //   console.log(i);
  //   console.log(step);
  //   switch (step.cmd) {
  //     case acc:
  //       accumulator += step.arg;
  //       step.wasHere = true;
  //       i += 1;
  //       break;
  //     case jmp:
  //       i += step.arg;
  //       step.wasHere = true;
  //       break;
  //     case nop:
  //       i += 1;
  //       step.wasHere = true;
  //       break;

  //     default:
  //       break;
  //   }
  // } while (!allParsedCommands[i].wasHere);

  //const result2 = recusrionSoulution(0, 0, allParsedCommands2);
  // const acc = 0;
  // for (let index = 0; index < 10; index++) {
  //   if (index === 4) {
  //     acc += 2;
  //   }
  //   else {
  //     acc += 1;
  //   }
  // }

  console.log('Result PartTwo', partTwo(allParsedCommands2, 0));
});

function parse(line) {
  const rx = /(nop|acc|jmp) (\+|-)(\d*)/;

  const parsed = line.match(rx);
  const number = parseInt(parsed[2] + parsed[3]);

  return { cmd: parsed[1], arg: number, wasHere: false };
}

function recusrionSoulution(accumulator, i, commands) {
  const step = commands[i];
  if (i < commands.length && !step.wasHere) {
    step.wasHere = true;
    switch (step.cmd) {
      case acc:
        return recusrionSoulution(accumulator + step.arg, i + 1, commands);
      case jmp:
        return recusrionSoulution(accumulator, i + step.arg, commands);
      case nop:
        return recusrionSoulution(accumulator, i + 1, commands);
    }
  } else {
    return [accumulator, i];
  }
}

function partTwo(arr, index) {
  if (index < arr.length) {
    const curr = arr[index];
    if (curr.cmd === jmp) {
      const sample = arr.map((item, idx) => {
        return idx === index
          ? { ...item, wasHere: false, cmd: nop }
          : { ...item, wasHere: false };
      });

      const [acc, lastIndex] = recusrionSoulution(0, 0, sample);
      return lastIndex === arr.length ? acc : partTwo(arr, index + 1);
    } else if (curr.cmd === nop) {
      const sample = arr.map((item, idx) => {
        return idx === index
          ? { ...item, wasHere: false, cmd: jmp }
          : { ...item, wasHere: false };
      });

      const [acc, lastIndex] = recusrionSoulution(0, 0, sample);
      return lastIndex === arr.length ? acc : partTwo(arr, index + 1);
    } else {
      return partTwo(arr, index + 1);
    }
  }

  return -1;
}
