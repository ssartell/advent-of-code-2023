import * as R from 'ramda';
import { getNeighbors, getValue, gridPositions } from '../utils/grid.js';
import { toString } from '../utils/vec2.js';

const parseInput = R.pipe(R.split('\n'), R.map(R.split('')));
const isNum = x => parseInt(x) >= 0 || false;
const isGear = x => x === '*';

const scan = grid => {
  let currentNum = 0;
  let readingNum = false;
  let isAdjacentToGear = false;
  let gearPos = null;
  let lastRow = -1;
  let gearNumbers = {};

  const endNumber = () => {
    if (readingNum) {
      if (isAdjacentToGear) {
        let key = toString(gearPos);
        gearNumbers[key] = (gearNumbers[key] || []);
        gearNumbers[key].push(currentNum);
      }
      currentNum = 0;
      isAdjacentToGear = false;
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
        if (isGear(neighborVal)) {
          isAdjacentToGear |= true;
          gearPos = neighbor;
        }
      }
    } else {
      endNumber();
    }
  }

  return gearNumbers;
}

export default R.pipe(parseInput, scan, R.values, R.filter(x => x.length === 2), R.map(R.apply(R.multiply)), R.sum);