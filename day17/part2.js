import * as R from 'ramda';
import { aStar, dijkstra } from '../utils/graph-traversal.js';
import { manhattan, add, sub, equals, toString } from '../utils/vec2.js';
import { getCardinalNeighbors, getValue } from '../utils/grid.js';

const debug = x => { 
  debugger; 
  return x; 
};

const parseInput = R.pipe(R.split('\n'), R.map(R.pipe(R.split(''), R.map(parseInt))));

const allEqual = (arr, eq) => R.all(x => eq(x, arr[0]), arr)

const pathFind = grid => {
  const factoryPos = {x: grid[0].length - 1, y: grid.length - 1};
  const startPos = {x: 0, y: 0};
  const minPath = aStar(
    { pos: startPos, cost: 0, dir: {x: 0, y: 0}, consecutive: 0 },
    x => equals(x.pos, factoryPos),
    x => getCardinalNeighbors(grid, x.pos)
      .map(y => {
        let dir = sub(y, x.pos);
        return { 
          pos: y, 
          prev: x, 
          cost: x.cost + getValue(grid, y), 
          dir: dir,
          consecutive: equals(dir, x.dir) ? x.consecutive + 1 : 0
        };
      })
      .filter(y => !equals(add(x.dir, y.dir), {x: 0, y: 0}))
      .filter(y => 4 <= y.consecutive && y.consecutive <= 10),
    x => x.cost,
    x => manhattan(sub(x.pos, factoryPos)),
    x => `${toString(x.pos)}:${toString(x.dir)}:${x.consecutive}`
  );
  //print(grid, minPath);
  return minPath.cost;
};

const dirs = {
  '<1, 0>': '>',
  '<0, -1>': '^',
  '<-1, 0>': '<',
  '<0, 1>': 'v'
};
const print = (grid, minPath) => {
  let seen = new Map();
  let x = minPath;
  while (x) {
    seen.set(toString(x.pos), x);
    x = x.prev;
  }

  for(let y = 0; y < grid.length; y++) {
    let str = ''
    for(let x = 0; x < grid[0].length; x++) {
      let pos = {x,y};
      let node = seen.get(toString(pos));
      str += seen.has(toString(pos)) && node?.prev?.pos ? dirs[toString(sub(pos, node.prev.pos))] : getValue(grid, pos);
    }
    console.log(str);
  }
}

export default R.pipe(parseInput, pathFind);