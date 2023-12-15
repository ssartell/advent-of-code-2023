import * as R from 'ramda';
import { gridPositions, getValue, setValue, isInBounds } from '../utils/grid.js';
import { add, sub } from '../utils/vec2.js';

const parseInput = R.pipe(R.split('\n'), R.map(R.split('')));

const simulate = R.curry((dir, grid) => {
  for(let pos of gridPositions(grid)) {
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

const calcLoad = grid => {
  let sum = 0;
  for(let pos of gridPositions(grid)) {
    if (getValue(grid, pos) === 'O') {
      sum += grid.length - pos.y;
    }
  }
  return sum;
}

export default R.pipe(parseInput, simulate({x: 0, y: -1}), calcLoad);