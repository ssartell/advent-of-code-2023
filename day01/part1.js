import * as R from 'ramda';

const parseInput = R.pipe(R.split('\n'), R.map(R.pipe(R.split(''), R.map(parseInt), R.filter(x => !isNaN(x)))));
const firstAndLast = x => R.head(x) * 10 + R.last(x);

export default R.pipe(parseInput, R.map(firstAndLast), R.sum);