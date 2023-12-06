import * as R from 'ramda';

const readNums = R.pipe(R.split(' '), R.map(parseInt));
const readSeeds = R.pipe(R.split(': '), R.last, readNums);
const readMap = R.pipe(readNums, x => ({ dst: x[0], src: x[1], length: x[2], diff: x[0] - x[1] }))
const readMaps = R.map(R.pipe(R.split('\n'), R.tail, R.map(readMap)));
const parseInput = R.pipe(R.split('\n\n'), x => ({ seeds: readSeeds(x[0]), maps: readMaps(R.tail(x))}));

const findLocations = config => {
  let min = Infinity;
  for(let seed of config.seeds) {
    let val = seed;
    for(let map of config.maps) {
      for(let range of map) {
        if (range.src <= val && val <= range.src + range.length) {
          val += range.diff;
          break;
        }
      }
    }
    min = Math.min(min, val);
  }
  return min;
}

export default R.pipe(parseInput, findLocations);