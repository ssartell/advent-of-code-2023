import * as R from 'ramda';
import { intersection } from 'mnemonist/set.js';

const cardRegex = /Card\s+(\d*): ([\d\s]*) \| ([\d\s]*)/;
const readNums = R.pipe(R.match(/\d+/g), R.map(parseInt));
const readLine = R.pipe(R.match(cardRegex), x => ({ id: parseInt(x[1]), winning: readNums(x[2]), youHave: readNums(x[3])}));
const parseInput = R.pipe(R.split('\n'), R.map(readLine));

const getWinningCount = card => {
  let a = new Set(card.winning);
  let b = new Set(card.youHave);
  return intersection(a,b).size;
};

const countInstances = winners => {
  const countCards = R.memoizeWith(i => i, i => {
    let sum = winners[i];
    for(let j = 0; j < winners[i]; j++) {
      sum += countCards(i + j + 1);
    }
    return sum;
  });

  let total = 0;
  for(let i = 0; i < winners.length; i++) {
    total += countCards(i) + 1;
  }
  return total;
}

export default R.pipe(parseInput, R.map(getWinningCount), countInstances);