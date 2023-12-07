import * as R from 'ramda';

const faces = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const types = [/5/, /4/, /2.*3|3.*2/, /3/, /2.*2/, /2/, /1/];
const primaryRank = counts => R.findIndex(x => R.match(x, counts).length > 0, types);
const secondaryRank = cards => R.map(x => R.indexOf(x, faces).toString(13),cards).join('');

const addCounts = hand => {
  let counts = faces.map(x => hand.cards.split(x).length - 1).join('');
  return { ...hand, counts, rank: primaryRank(counts) + secondaryRank(hand.cards) };
};

const readLine = R.pipe(R.split(' '), R.zipObj(['cards', 'bid']), R.evolve({ bid: parseInt }), addCounts); //cards: R.split(''),
const parseInput = R.pipe(R.split('\n'), R.map(readLine));

const sortHands = R.sortWith([R.descend(x => x.rank1), R.descend(x => x.rank2)]);
const totalWinnings = hands => hands.reduce((a, x, i) => a + x.bid * (i + 1), 0);

export default R.pipe(parseInput, R.sortBy(x => x.rank), R.reverse, totalWinnings);