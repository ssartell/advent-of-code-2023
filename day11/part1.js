import * as R from 'ramda';
import { getValue, gridPositions } from '../utils/grid.js';
import { manhattan, sub } from '../utils/vec2.js';
import { isInRange, toRange } from '../utils/range.js';

const emptyRowIndices = image => image.map((y, i) => R.all(x => x === '.', y) ? i : null).filter(x => x !== null);
const findGalaxies = image => gridPositions(image).filter(x => getValue(image, x) === '#');
const findExpansions = image => ({ 
  galaxies: findGalaxies(image), 
  yExpansions: emptyRowIndices(image), 
  xExpansions: emptyRowIndices(R.transpose(image)) 
});

const shortestPaths = universe => {
  let res = [];

  for(let i = 0; i < universe.galaxies.length - 1; i++) {
    let a = universe.galaxies[i];
    for(let j = i + 1; j < universe.galaxies.length; j++) {
      let b = universe.galaxies[j];
      let dist = manhattan(sub(a, b));
      dist += universe.yExpansions.filter(y => isInRange(toRange(a.y, b.y), y)).length;
      dist += universe.xExpansions.filter(x => isInRange(toRange(a.x, b.x), x)).length;
      res.push(dist);
    }
  }

  return res;
}

const parseInput = R.pipe(R.split('\n'), R.map(R.split('')), findExpansions);

export default R.pipe(parseInput, shortestPaths, R.sum);