import * as R from 'ramda';
import lcm from 'compute-lcm';

const parseNode = R.pipe(R.match(/(\w{3})/g), x => ({ label: x[0], L: x[1], R: x[2] }));
const parseNetwork = R.pipe(R.split('\n'), R.map(parseNode), R.indexBy(x => x.label));
const parseInput = R.pipe(R.split('\n\n'), R.zipObj(['inst', 'network']), R.evolve({network: parseNetwork}));

const toKey = (node, i) => `${i}:${node}`;

const walk = ({inst, network}) => {
  let paths = R.keys(network).filter(x => x[2] === 'A').map(x => ({ start: x, end: x, seen: new Set([toKey(x, 0)]), when: { x: 0 }}));
  let i = 0;
  let steps = 1;
  while (true) {
    for(let j = 0; j < paths.length; j++) {
      const path = paths[j];
      if (path.loop) continue;

      const node = network[path.end][inst[i]];
      path.end = node;

      const key = toKey(node, i + 1);
      if (path.seen.has(key) && node[2] === 'Z') {
        path.loop = steps - path.when[key];
        path.loopStart = path.when[key];
      } else {
        path.seen.add(key);
        path.when[key] = steps;
      }      
    }
    i = (i + 1) % inst.length;
    steps++;
    if (R.all(x => x.loop, paths)) break;
  }

  return lcm(paths.map(x => x.loop));
} 

export default R.pipe(parseInput, walk);