let dotPositions = {
  red: null, 
  black1: null
};

let observer = null;

export function observe(o) {
  observer = o;
  observer(dotPositions);
}

export function moveDot(dot, target){
  dotPositions[dot] = target
  observer(dotPositions);
};