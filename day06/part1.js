import * as R from 'ramda';

const readLine = R.pipe(R.match(/\w+:\s+((?:\s*\d+)+)/), R.last, R.split(/\s+/), R.map(parseInt));
const parseInput = R.pipe(R.split('\n'), R.map(readLine), R.apply(R.zip), R.map(([time, dist]) => ({time, dist})));

const quadratic = (a, b, c) => [(-b+Math.sqrt(b*b-4*a*c))/(2*a), (-b-Math.sqrt(b*b-4*a*c))/(2*a)];

const waysToBeat = race => {
  const [a, b] = quadratic(-1, race.time, -race.dist);
  return Math.ceil(b) - Math.floor(a) - 1;
}

export default R.pipe(parseInput, R.map(waysToBeat), R.reduce(R.multiply, 1));
