// const startPositions = {
//   red: 'redDotStart',
//   black: 'blackDotStart',
// }

// let dotPosition = 'start'

let dotPositions = {
  redDot: {
    type: 'red',
    position: 'redStart',
  }, 
  blackDot: {
    type: 'black',
    position: 'blackStart',
  }
}

// let dotPositions = { ...startPositions };

let observer = null;

// export function resetDots() {
//   dotPositions = { ...startPositions };
// }

export function observe(o) {
  observer = o;
  observer(dotPositions);
}

export function moveDot(dotName, targetName) {
  dotPositions[dotName].position = targetName;
  observer(dotPositions);
};

// export function moveDot(target) {
//   console.log('moveDot called to: ', target);
//   dotPosition = target;
//   observer(dotPositions);
// }



// export function getStartPositions() { return startPositions; };
