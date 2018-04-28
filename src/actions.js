// const startPositions = {
//   red: 'redDotStart',
//   black: 'blackDotStart',
// }

let dotPosition = 'start'

// let dotPositions = { ...startPositions };

let observer = null;

// export function resetDots() {
//   dotPositions = { ...startPositions };
// }

export function observe(o) {
  observer = o;
  observer(dotPosition);
}

// export function moveDot(dot, target) {
//   dotPositions[dot] = target;
//   observer(dotPositions);
// };

export function moveDot(target) {
  console.log('moveDot called to: ', target);
  dotPosition = target;
  observer(dotPosition);
}

// export function getStartPositions() { return startPositions; };
