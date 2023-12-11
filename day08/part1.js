import * as R from 'ramda';

const parseNode = R.pipe(R.match(/(\w{3})/g), x => ({ label: x[0], L: x[1], R: x[2] }));
const parseNetwork = R.pipe(R.split('\n'), R.map(parseNode), R.indexBy(x => x.label));
const parseInput = R.pipe(R.split('\n\n'), R.zipObj(['inst', 'network']), R.evolve({network: parseNetwork}));

const walk = ({inst, network}) => {
  let curr = 'AAA';
  let i = 0;
  let steps = 0;
  while (curr !== 'ZZZ') {
    curr = network[curr][inst[i]];
    i = (i + 1) % inst.length;
    steps++;
  }
  return steps;
}

export default R.pipe(parseInput, walk);