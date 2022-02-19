fs = require('fs');
fs.readFile('input.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  const arr = data.split('\n\n');
  const counter = arr.reduce((acc, item) => {
    if (isValid2(toPassport(item))) {
      return acc + 1;
    }
    return acc;
  }, 0);

  console.log(counter);
});

function toPassport(item) {
  return item.split(/ |\n/).reduce((acc, pairStr) => {
    let [key, value] = pairStr.split(':');
    acc[key] = value;
    return acc;
  }, {});
}

const requiredKeys = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];
const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

function isValid(passport) {
  const keys = Object.keys(passport);
  return requiredKeys.every((key) => keys.includes(key));
}

function isValid2(passport) {
  const keys = Object.keys(passport);

  const validators = [
    checkEyeColor,
    checkPassportId,
    checkHeight,
    checkBirthYear,
    issueYear,
    expirationYear,
    checkHairColor,
  ];

  return (
    requiredKeys.every((key) => keys.includes(key)) &&
    validators.every((f) => f(passport))
  );
}

//
function checkEyeColor({ ecl }) {
  return validEyeColors.includes(ecl);
}

function checkPassportId({ pid }) {
  return parseInt(pid) && pid.length === 9;
}

function checkHeight({ hgt }) {
  const height = parseInt(hgt);
  return hgt.includes('cm')
    ? height >= 150 && height <= 193
    : height >= 59 && height <= 76;
}

function checkBirthYear({ byr }) {
  return (byr.length = 4 && byr >= 1920 && byr <= 2002);
}

function issueYear({ iyr }) {
  return (iyr.length = 4 && iyr >= 2010 && iyr <= 2020);
}

function expirationYear({ eyr }) {
  return (eyr.length = 4 && eyr >= 2020 && eyr <= 2030);
}

function checkHairColor({ hcl }) {
  const rg = /#[\w]{6}/;
  return hcl.match(rg);
}
