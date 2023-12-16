import * as R from 'ramda';

const hash = R.reduce((a, c) => ((a + c.charCodeAt(0)) * 17) % 256, 0);
const parseOp = R.pipe(R.match(/(\w+)(=|-)(\d?)/), R.tail, R.zipObj(['label', 'op', 'focal']), R.evolve({focal: parseInt}));
const parseInput = R.pipe(R.split(','), R.map(parseOp));

const run = cmds => {
  let boxes = R.repeat(0, 256).map(x => []);
  for(let cmd of cmds) {
    let boxIndex = hash(cmd.label);
    let box = boxes[boxIndex];
    if (cmd.op === '=') {
      let i = box.findIndex(x => x.label === cmd.label);
      if (i < 0) {
        box.push(cmd);
      } else {
        boxes[boxIndex] = R.update(i, cmd, box);
      }
    } else if (cmd.op === '-') {
      let i = box.findIndex(x => x.label === cmd.label);
      if (i < 0) continue;
      boxes[boxIndex] = R.remove(i, 1, box);
    }
  }
  return boxes;
};

const focusingPower = boxes => {
  let sum = 0;
  for(let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    for(let j = 0; j < box.length; j++) {
      let lense = box[j];
      sum += (i + 1) * (j + 1) * lense.focal;
    }
  }
  return sum;
}

export default R.pipe(parseInput, run, focusingPower);