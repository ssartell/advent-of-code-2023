import * as R from 'ramda';

const parseInput = R.pipe(R.split(','));
const hash = R.reduce((a, c) => ((a + c.charCodeAt(0)) * 17) % 256, 0);

export default R.pipe(parseInput, R.map(hash), R.sum);