import * as R from 'ramda';
import { gridPositions, getValue, setValue, isInBounds } from '../utils/grid.js';
import { add, sub } from '../utils/vec2.js';

const parseInput = R.pipe(R.split('\n'), R.map(R.split('')));

const simulate = R.curry((dir, grid) => {
  let positions = gridPositions(grid);
  if (dir.x > 0 || dir.y > 0) {
    positions = R.reverse(positions);
  }
  for(let pos of positions) {
    if (getValue(grid, pos) === 'O') {
      setValue(grid, pos, '.');
      while(isInBounds(grid, pos) && getValue(grid, pos) === '.') {
        pos = add(pos, dir);
      }
      pos = sub(pos, dir);
      setValue(grid, pos, 'O');
    }
  }
  return grid;
});

const dirs = [{x: 0, y: -1}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 0}];
const cycle = grid => {
  for(let dir of dirs) {
    grid = simulate(dir, grid);
  }
  return grid;
};

const repeatCycle = R.curry((count, grid) => {
  let seen = new Set();
  let when = new Map();
  let load = new Map();
  for(let i = 1; i <= count; i++) {
    grid = cycle(grid);
    let key = JSON.stringify(grid);
    if (seen.has(key)) {
      let loopStart = when.get(key);
      return load.get((count - loopStart) % (i - loopStart) + loopStart);
    } else {
      seen.add(key);
      when.set(key, i);
      load.set(i, calcLoad(grid));
    }
  }

  return grid;
});

const calcLoad = grid => {
  let sum = 0;
  for(let pos of gridPositions(grid)) {
    if (getValue(grid, pos) === 'O') {
      sum += grid.length - pos.y;
    }
  }
  return sum;
};

export default R.pipe(parseInput, repeatCycle(1000000000));