const startPositions = {
  redDot: {
    type: 'red',
    position: 'redStart',
  },
  greenDot: {
    type: 'green',
    position: 'greenStart',
  },
  blueDot: {
    type: 'blue',
    position: 'blueStart',
  },
  blackDot1: {
    type: 'black',
    position: 'blackStart1',
  },
  blackDot2: {
    type: 'black',
    position: 'blackStart2',
  },
}

// Deep Clone; 
let dotPositions = JSON.parse(JSON.stringify(startPositions));

// let dotPositions = { ...startPositions };

let observer = null;

export function resetDots() {
  dotPositions = JSON.parse(JSON.stringify(startPositions));
  observer(dotPositions);
}

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
