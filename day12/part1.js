import * as R from 'ramda';

const readGroups = R.pipe(R.split(','), R.map(parseInt));
const readLine = R.pipe(R.split(' '), R.zipObj(['row', 'groups']), R.evolve({ groups: readGroups }));
const parseInput = R.pipe(R.split('\n'), R.map(readLine));

const allCouldBeSprings = R.all(x => x === '#' || x === '?');
const countArrangements = (row, groups) => {
  row = R.replace(/^\.+/, '', row);
  if (groups.length === 0) return (row.indexOf('#') < 0) ? 1 : 0;
  if (row.length === 0) return 0;
  if (row.length < groups[0]) return 0;

  let possibilities = 0;
  let [group, ...left] = groups;
  let after = row.substring(group, group + 1);
  if (allCouldBeSprings(row.substring(0, group)) && (after === '.' || after === '?' || after === '')) {
    possibilities += countArrangements(row.slice(group + 1), left);
  }
  let size = R.match(/^(?:\.|\?)/, row)[0]?.length || 0;
  if (size > 0) {
    possibilities += countArrangements(R.replace(/^(?:\.|\?)/, '', row), groups);
  }
  
  return possibilities;
};

export default R.pipe(parseInput, R.map(({row, groups}) => countArrangements(row, groups)), debug, R.sum);