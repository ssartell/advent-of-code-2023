import * as R from 'ramda';
import { bfs } from '../utils/graph-traversal.js';
import { indexOf, getCardinalNeighbors, getValue, setValue } from '../utils/grid.js';
import { toString, sub, add } from '../utils/vec2.js';

const debug = x => { 
  debugger; 
  return x; 
};

const dirs = [{x: 0, y: -1}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}]
const dirIndex = { '<0, -1>': 0, '<1, 0>': 1, '<0, 1>': 2, '<-1, 0>': 3 };
const niceChars = {F: '╔', J: '╝', L: '╚', 7: '╗', '-': '═', '|': "║", '.': ' ', 'S': 'S' };
const pipePatterns = {
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
const findPipeMatch = pattern => {
  for(let pipe of R.keys(pipePatterns)) {
    if (R.all(x => x, R.zipWith(R.equals, pattern, pipePatterns[pipe]))) return pipe;
  }
};

const isValidStep = (grid, a, b) => {
  try {
    let aToB = pipePatterns[getValue(grid, a)][dirIndex[toString(sub(b, a))]];
    let bToA = pipePatterns[getValue(grid, b)][dirIndex[toString(sub(a, b))]];
    return aToB && bToA
  } catch (e) {
    debugger;
  }  
};

const walkPipe = grid => {
  let start = { ...indexOf(grid, 'S'), step: 0 };
  let loop = new Set([toString(start)]);
  bfs(
    start,
    x => {
      const key = toString(x);
      if (!loop.has(key)) {
        loop.add(key);
      }
    },
    x => getCardinalNeighbors(grid, x)
      .filter(n => isValidStep(grid, x, n))
      .map(n => ({ ...n, step: x.step + 1})),
    toString
  );
  return loop;
};

const countEnclosed = grid => {
  let start = indexOf(grid, 'S');
  let loop = walkPipe(grid);
  let test = dirs
    .map(x => add(start, x))
    .map(x => loop.has(toString(x)) && isValidStep(grid, start, x) ? 1 : 0);
  setValue(grid, start, findPipeMatch(test))
  let enclosed = 0;
  for(let y = 0; y < grid.length; y++) {
    let intersections = 0;
    let line = '';
    for(let x = 0; x < grid[0].length; x++) {
      let pos = {x,y};
      let key = toString(pos);
      let val = grid[y][x];
      if (loop.has(key)) {
        if (val === '|' || val === 'L' || val === 'J') {
          intersections++;
        }

        line += niceChars[getValue(grid, pos)];
      } else if (intersections % 2 === 1) {
        enclosed++;
        line += '@';
      } else {
        line += '.';
      }
    }
    console.log(line);
  }
  return enclosed;
};

const parseInput = R.pipe(R.split('\n'), R.map(R.split('')));

export default R.pipe(parseInput, countEnclosed);