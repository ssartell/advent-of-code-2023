import * as R from 'ramda';

const parseId = R.pipe(R.split(' '), R.last, parseInt);
const parseSubset = R.pipe(R.split(' '), R.zipObj(['count', 'color']), R.evolve({ count: parseInt }));
const parseSubsets = R.pipe(R.split('; '), R.map(R.pipe(R.split(', '), R.map(parseSubset))));
const readGame = R.pipe(R.split(': '), R.zipObj(['id', 'subsets']), R.evolve({ id: parseId, subsets: parseSubsets }));
const parseInput = R.pipe(R.split('\n'), R.map(readGame));

const asCount = game => {
  const res = { id: game.id };
  for(let subset of game.subsets) {
    for (let {count, color} of subset) {
      res[color] = Math.max((res[color] || 0), count);
    }    
  }
  return res;
};

const gameIsPossible = R.curry((config, game) => R.all(key => game[key] <= config[key], R.keys(config)));
const sumIds = R.pipe(R.map(R.prop('id')), R.sum);

export default R.pipe(parseInput, R.map(asCount), R.filter(gameIsPossible({red: 12, green: 13, blue: 14})), sumIds);