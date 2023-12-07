import * as R from 'ramda';

const readLine = R.pipe(R.match(/\w+:\s+((?:\s*\d+)+)/), R.last, R.replace(/\s+/g, ''), parseInt);
const parseInput = R.pipe(R.split('\n'), R.map(readLine), ([time, dist]) => ({time, dist}));

const quadratic = (a, b, c) => [(-b+Math.sqrt(b*b-4*a*c))/(2*a), (-b-Math.sqrt(b*b-4*a*c))/(2*a)];

const waysToBeat = race => {
  const [a, b] = quadratic(-1, race.time, -race.dist);
  return Math.ceil(b) - Math.floor(a) - 1;
}

export default R.pipe(parseInput, waysToBeat);
