import * as R from 'ramda';

const parseLine = R.pipe(R.split(' '), R.map(parseInt));
const parseInput = R.pipe(R.split('\n'), R.map(parseLine));

const extrapolate = history => {
  if (R.all(x => x === 0, history)) return 0;

  let diffs = R.zipWith((a, b) => b - a, history, R.tail(history))
  return R.last(history) + extrapolate(diffs);
}

export default R.pipe(parseInput, R.map(extrapolate), R.sum);