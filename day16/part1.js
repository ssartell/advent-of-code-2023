import * as R from 'ramda';
import { bfs } from '../utils/graph-traversal.js';
import { add, sub, toString, rotate90, rotate270 } from '../utils/vec2.js';
import { getValue, isInBounds } from '../utils/grid.js';

const parseInput = R.pipe(R.split('\n'), R.map(R.split('')));

const simulate = grid => {
  let seen = new Set();
  bfs(
    {
      pos: {x: 0, y: 0},
      dir: {x: 1, y: 0}
    },
    x => {
      if (isInBounds(grid, x.pos)) {
        seen.add(toString(x.pos));
      }
      return false;
    },
    x => {
      if (!isInBounds(grid, x.pos)) return [];

      let tile = getValue(grid, x.pos);
      if (tile === '/') {
        let dir = { x: -x.dir.y, y: -x.dir.x };
        return [{pos: add(x.pos, dir), dir}];
      } else if (tile === '\\') {
        let dir = { x: x.dir.y, y: x.dir.x };
        return [{pos: add(x.pos, dir), dir}];
      } else if (tile === '|') {
        if (x.dir.x === 0) {
          return [{pos: add(x.pos, x.dir), dir: x.dir}];
        } else {
          let up = {x: 0, y: -1};
          let down = {x: 0, y: 1};
          return [
            { pos: add(x.pos, up), dir: up },
            { pos: add(x.pos, down), dir: down },
          ]
        }
      } else if (tile === '-') {
        if (x.dir.y === 0) {
          return [{pos: add(x.pos, x.dir), dir: x.dir}];
        } else {
          let left = {x:-1, y: 0};
          let right = {x: 1, y: 0};
          return [
            { pos: add(x.pos, left), dir: left },
            { pos: add(x.pos, right), dir: right },
          ];
        }
      } else {
        return [{pos: add(x.pos, x.dir), dir: x.dir}];
      }
    },
    x => `${toString(x.pos)}:${toString(x.dir)}`
  );

  return seen.size;
}

export default R.pipe(parseInput, simulate);