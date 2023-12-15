import * as R from 'ramda';

const debug = x => { 
  debugger; 
  return x; 
};

const readGroups = R.pipe(R.split(','), R.map(parseInt));
const readLine = R.pipe(R.split(' '), R.zipObj(['row', 'groups']), R.evolve({ groups: readGroups }));
const parseInput = R.pipe(R.split('\n'), R.map(readLine));

const allCouldBeSprings = R.all(x => x === '#' || x === '?')

const countArrangements = (row, groups, it) => {
  row = R.replace(/^\.+/, '', row);
  if (groups.length === 0) return it;
  if (row.length === 0) return 0;
  if (row.length < groups[0]) return 0;

  let possibilities = 0;
  let [group, ...left] = groups;
  let after = row.substring(group, group + 1);
  if (allCouldBeSprings(row.substring(0, group)) && (after === '.' || after === '?' || after === '')) {
    possibilities += countArrangements(row.slice(group + 1), left, it + R.repeat('#', group).join(''));
  }
  possibilities += countArrangements(R.replace(/^(?:\.|\?|\#+)/, '', row), groups, it + '.');
  
  return possibilities;
};

export default R.pipe(parseInput, R.map(({row, groups}) => countArrangements(row, groups, '')), debug);