import * as R from 'ramda';
import { getNeighbors, getValue, gridPositions } from '../utils/grid.js';

const parseInput = R.pipe(R.split('\n'), R.map(R.split('')));
const isNum = x => parseInt(x) >= 0 || false;
const isSymbol = x => !isNum(x) && x !== '.';

const scan = grid => {
  let sum = 0;
  let currentNum = 0;
  let readingNum = false;
  let isAdjacentToSymbol = false;
  let lastRow = -1;

  const endNumber = () => {
    if (readingNum) {
      if (isAdjacentToSymbol) {
        sum += currentNum;
      } 
      currentNum = 0;
      isAdjacentToSymbol = false;
      readingNum = false;
    }
  }

  for(let pos of gridPositions(grid)) {
    if (pos.y !== lastRow) {
      endNumber();
    }
    lastRow = pos.y;
    let val = getValue(grid, pos);
    if (isNum(val)) {
      let num = parseInt(val);
      currentNum = currentNum * 10 + num;
      readingNum = true;
      for(let neighbor of getNeighbors(grid, pos)) {
        let neighborVal = getValue(grid, neighbor);
        isAdjacentToSymbol |= isSymbol(neighborVal);
      }
    } else {
      endNumber();
    }
  }
  return sum;
}

export default R.pipe(parseInput, scan);