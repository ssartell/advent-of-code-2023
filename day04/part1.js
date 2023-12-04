import * as R from 'ramda';
import { intersection } from 'mnemonist/set.js';

const cardRegex = /Card\s+(\d*): ([\d\s]*) \| ([\d\s]*)/;
const readNums = R.pipe(R.match(/\d+/g), R.map(parseInt));
const readLine = R.pipe(R.match(cardRegex), x => ({ id: parseInt(x[1]), winning: readNums(x[2]), youHave: readNums(x[3])}));
const parseInput = R.pipe(R.split('\n'), R.map(readLine));

const getPoints = card => {
  let a = new Set(card.winning);
  let b = new Set(card.youHave);
  return Math.floor(Math.pow(2, intersection(a,b).size - 1));
}

export default R.pipe(parseInput, R.map(getPoints), R.sum);