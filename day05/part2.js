import * as R from 'ramda';

const debug = x => { 
  debugger; 
  return x; 
};

const toRange = (start, end) => ({ start, end });
const readNums = R.pipe(R.split(' '), R.map(parseInt));
const readSeeds = R.pipe(R.split(': '), R.last, readNums);
const readMap = R.pipe(readNums, x => ({ dst: toRange(x[0], x[0] + x[2]), src: toRange(x[1], x[1] + x[2]), diff: x[0] - x[1] }))
const readMaps = R.map(R.pipe(R.split('\n'), R.tail, R.map(readMap)));
const parseInput = R.pipe(R.split('\n\n'), x => ({ seeds: readSeeds(x[0]), maps: readMaps(R.tail(x))}));

const doesOverlap = (a, b) => Math.max(a.start, b.start) <= Math.min(a.end, b.end);
const intersection = (a, b) => toRange(Math.max(a.start, b.start), math.min(a.end, b.end));

const findLocations = config => {
  const mapSeedRange = (range, i) => {
    if (i >= config.maps.length) return [range];
    let results = [];
    let map = config.maps[i];
    for(let { src, dst, diff } of map) {
      if (doesOverlap(range, src)) {
        if (range.start < src.start) {
          if (range.end <= src.end) {
            results.push(mapSeedRange(toRange(range.start, src.start - 1), i));
            results.push(mapSeedRange(toRange(src.start + diff, range.end + diff), i + 1));
          } else {
            results.push(mapSeedRange(toRange(range.start, src.start - 1), i));
            results.push(mapSeedRange(toRange(src.start + diff, src.end + diff), i + 1));
            results.push(mapSeedRange(toRange(src.end + 1, range.end), i));
          }
        } else {
          if (range.end <= src.end) {
            results.push(mapSeedRange(toRange(range.start + diff, range.end + diff), i + 1));
          } else {
            results.push(mapSeedRange(toRange(range.start + diff, src.end + diff), i + 1));
            results.push(mapSeedRange(toRange(src.end + 1, range.end), i));
          }
        }
      }
    }
    if (results.length === 0) {
      results = [mapSeedRange(range, i + 1)];
    }
    return R.flatten(results);
  }
  let min = Infinity;
  for(let [a, b] of R.splitEvery(2, config.seeds)) {
    let ranges = mapSeedRange(toRange(a, a + b), 0);
    for(let range of ranges) {
      min = Math.min(min, range.start);
    }
  }
  return min;
}

export default R.pipe(parseInput, findLocations);