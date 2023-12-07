import * as R from 'ramda';

const readLine = R.pipe(R.match(/\w+:\s+((?:\s*\d+)+)/), R.last, R.replace(/\s+/g, ''), parseInt);
const parseInput = R.pipe(R.split('\n'), R.map(readLine), ([time, dist]) => ({time, dist}));

const waysToBeat = race => {
  let count = 0;
  for(let i = 0; i <= race.time; i++) {
    let dist = (race.time - i) * i;
    count += dist > race.dist ? 1 : 0;
  }
  return count;
}

export default R.pipe(parseInput, waysToBeat);
