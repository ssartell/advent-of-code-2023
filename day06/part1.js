import * as R from 'ramda';

const readLine = R.pipe(R.match(/\w+:\s+((?:\s*\d+)+)/), R.last, R.split(/\s+/), R.map(parseInt));
const parseInput = R.pipe(R.split('\n'), R.map(readLine), R.apply(R.zip), R.map(([time, dist]) => ({time, dist})));

const waysToBeat = race => {
  let count = 0;
  for(let i = 0; i <= race.time; i++) {
    let dist = (race.time - i) * i;
    count += dist > race.dist ? 1 : 0;
  }
  return count;
}

export default R.pipe(parseInput, R.map(waysToBeat), R.reduce(R.multiply, 1));
