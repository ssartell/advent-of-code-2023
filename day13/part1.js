import * as R from 'ramda';
import levenshtein from 'fast-levenshtein';

const debug = x => {
  debugger; 
  return x; 
};

const equal = (a,b) => R.all(R.apply(R.equals), R.zip(a, b));
const findReflection = pattern => {
  for(let i = 1; i < pattern.length; i++) {
    let a = R.reverse(R.take(i, pattern));
    let b = R.drop(i, pattern);
    if (equal(a, b)) return i;
  }
  return 0;
};

const transpose = R.pipe(R.transpose, R.map(R.join('')));
const summarize = pattern => findReflection(transpose(pattern)) + 100 * findReflection(pattern);

const parseInput = R.pipe(R.split('\n\n'), R.map(R.split('\n')));

export default R.pipe(parseInput, R.map(summarize), R.sum);