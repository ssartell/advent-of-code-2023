import * as R from 'ramda';
import { bfs } from '../utils/graph-traversal.js';
import { indexOf, getCardinalNeighbors, getValue } from '../utils/grid.js';
import { toString, sub } from '../utils/vec2.js';

const debug = x => { 
  debugger; 
  return x; 
};

const dirIndex = { '<0, -1>': 0, '<1, 0>': 1, '<0, 1>': 2, '<-1, 0>': 3 };
const validityTable = {
  // up, right, down, left
  '|': [1,0,1,0],
  '-': [0,1,0,1],
  'L': [1,1,0,0],
  'J': [1,0,0,1],
  '7': [0,0,1,1],
  'F': [0,1,1,0],
  '.': [0,0,0,0],
  'S': [1,1,1,1],
};

const isValidStep = (grid, a, b) => {
  let aToB = validityTable[getValue(grid, a)][dirIndex[toString(sub(b, a))]];
  let bToA = validityTable[getValue(grid, b)][dirIndex[toString(sub(a, b))]];
  return aToB && bToA
};

const walkPipe = grid => {
  let start = { ...indexOf(grid, 'S'), step: 0 };
  let seen = new Set();
  let last = null;
  bfs(
    start,
    x => {
      const key = toString(x);
      if (seen.has(key)) {
        debugger;
      } else {
        seen.add(key);
        last = x;
      }
    },
    x => getCardinalNeighbors(grid, x)
      .filter(n => isValidStep(grid, x, n))
      .map(n => ({ ...n, step: x.step + 1})),
    toString
  );
  return last.step;
};

const parseInput = R.pipe(R.split('\n'), R.map(R.split('')));

export default R.pipe(parseInput, walkPipe);