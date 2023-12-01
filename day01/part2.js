import * as R from 'ramda';

const spelledOutDigits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const digitMatch = /(?=(zero|one|two|three|four|five|six|seven|eight|nine|\d))/g;

const firstAndLast = x => {
  let result = [...x.matchAll(digitMatch)];
  let first = R.head(result)
  let last = R.last(result);
  return (parseInt(first[1]) || spelledOutDigits.indexOf(first[1])) * 10 
    + (parseInt(last[1]) || spelledOutDigits.indexOf(last[1]));
}

const parseInput = R.pipe(R.split('\n'));

export default R.pipe(parseInput, R.map(firstAndLast), R.sum);