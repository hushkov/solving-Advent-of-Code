fs = require('fs');
fs.readFile('input2.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  const lines = data.split('\n');

  const t =
    'dark orange bags contain 3 bright white bags, 4 muted yellow bags.';

  const map = new Map();

  const parsedNodes = lines
    .slice(0, -1)
    // .slice(0, 10)
    .map(toNode)
    .forEach(({ node, items }) => {
      map.set(node, items);
    });

  // const result1 = Array.from(map.keys()).reduce((acc, key) => {
  //   if (contains(key, map)) {
  //     // console.log('the node with key contains', key, map.get(key));
  //     return acc + 1;
  //   } else {
  //     return acc;
  //   }
  // }, 0);

  // console.log(result);
  //
  const result2 = count('shiny gold', map);

  console.log(result2);
});

function contains(nodeName, map) {
  const itemsFromMap = map.get(nodeName);
  if (itemsFromMap?.length > 0) {
    return itemsFromMap.some((item) => {
      const key = item[0];
      if (key === 'shiny gold') {
        return true;
      } else {
        return contains(item[0], map);
      }
    });
  } else {
    return false;
  }
}

function count(nodeName, map) {
  const itemsFromMap = map.get(nodeName);
  if (itemsFromMap?.length > 0) {
    return itemsFromMap.reduce((acc, item) => {
      const key = item[0];
      const countOfItems = item[1];

      if (key === 'shiny gold') {
        return acc;
      } else {
        // const countOfChild = count(key, map);
        // console.log(nodeName, key, countOfChild, countOfItems);
        return acc + countOfItems + countOfItems * count(key, map);
      }
    }, 0);
  } else {
    return 0;
  }
}

const toNode = (str) => {
  const rx = /(\d) (\w* \w*) bag(s?)/;

  const pair = str.split(' bags contain ');
  const nodeBagName = pair[0];

  const rest = pair[1];

  if (rest !== 'no other bags.') {
    const items = rest.split(', ');

    const items1 = items.map((item) => {
      const result = item.match(rx);

      return [result[2], parseInt(result[1])];
    });

    return { node: nodeBagName, items: items1 };
  } else {
    return { node: nodeBagName, items: [] };
  }
};
