import React, { Component } from 'react';
import update from 'immutability-helper';

const style = {
  border: '1px solid black'
}

const solutionLocations = {
  black1: {
    dotLocation: {
      x: 100,
      y: 209
    },
    midPoint: {
      x: 128,
      y: 235
    },
    type: 'black',
    occupied: false,
  },
  black2: {
    dotLocation: {
      x: 317,
      y: 265
    },
    midPoint: {
      x: 346,
      y: 293,
    },
    type: 'black',
    occupied: false,
  },
  red: {
    dotLocation: {
      x: 338,
      y: 138
    },
    midPoint: {
      x: 366,
      y: 166,
    },
    type: 'red',
    occupied: false,
  },
  blue: {
    dotLocation: {
      x: 233,
      y: 125
    },
    midPoint: {
      x: 260,
      y: 150,
    },
    type: 'blue',
    occupied: false,
  },
  green: {
    dotLocation: {
      x: 156,
      y: 293
    },
    midPoint: {
      x: 183,
      y: 318,
    },
    type: 'green',
    occupied: false,
  }
}


let currentDots;

// const emptyLogo = <img src='/assets/ia-logo-back.png' />;

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.createCanvas();
  }

  componentDidUpdate() {
    // this.draw();
  }

  generateInitialDots() {
    const { emptyLogo, redDot, blackDot, greenDot, blueDot } = this.state;
    return ({
      emptyLogo: {
        x: 75,
        y: 100,
        w: 350,
        h: 350,
        src: emptyLogo,
        isDragging: false,
        notDraggable: true,
      },
      redDot: {
        x: 75,
        y: 25,
        w: 55,
        h: 55,
        src: redDot,
        type: 'red',
        isDragging: false,
        name: 'redDot'
      },
      blackDot1: {
        x: 150,
        y: 25,
        w: 55,
        h: 55,
        src: blackDot,
        type: 'black',
        isDragging: false,
        name: 'blackDot1'
      },
      blackDot2: {
        x: 220,
        y: 25,
        w: 55,
        h: 55,
        src: blackDot,
        type: 'black',
        isDragging: false,
        name: 'blackDot2'
      },
      greenDot: {
        x: 290,
        y: 25,
        w: 55,
        h: 55,
        src: greenDot,
        type: 'green',
        isDragging: false,
        name: 'greenDot',
      },
      blueDot: {
        x: 365,
        y: 25,
        w: 55,
        h: 55,
        src: blueDot,
        type: 'blue',
        isDragging: false,
        name: 'blueDot',
      },
    });
  }

  createCanvas() {
    const { canvas, emptyLogo, redDot, blackDot, greenDot, blueDot } = this.refs;
    const ctx = canvas.getContext('2d');
    const canvasBounds = canvas.getBoundingClientRect();
    const offsetX = canvasBounds.left;
    const offsetY = canvasBounds.top;
    let canDrag = true;
    let mouseX;
    let mouseY;
    this.setState({
      canvas,
      emptyLogo,
      redDot,
      blackDot,
      greenDot,
      blueDot,
      ctx,
      offsetX,
      offsetY,
      canDrag,
      mouseX,
      mouseY,
      solutionLocations,
    }, () => {
      const dotPositions = this.generateInitialDots(emptyLogo, redDot, blackDot, greenDot, blueDot);
      this.setState({ dotPositions }, this.drawCanvas)
    })
    
    canvas.onmousedown = this.mouseDown;
    canvas.onmouseup = this.mouseUp;
    canvas.onmousemove = this.mouseMove;
    // setTimeout(this.drawCanvas, 1000);
  }

  mouseDown = (e) => {
    const { offsetX, offsetY, canDrag, dotPositions } = this.state;
    console.log('mouse down')
    e.preventDefault();
    e.stopPropagation();
    const currentMouseX = parseInt(e.clientX) - offsetX;
    const currentMouseY = parseInt(e.clientY) - offsetY;
    console.log('currentMouse: ', currentMouseX, currentMouseY);
    this.setState({ 
      canDrag: false,
      mouseX: currentMouseX,
      mouseY: currentMouseY,
    });

    Object.keys(dotPositions).forEach((dotName) => {
      const currentDot = dotPositions[dotName];
      if (currentDot.notDraggable) {
        return;
      }
      // console.log('checking dot: ', dot)
      // console.log('mouseX, y: ', mouseX, mouseY)
      // console.log('dot: ', dot);
      if (this.mouseWithinDot(currentMouseX, currentMouseY, currentDot)) {
        console.log('mousewithinDot!: ', currentDot);
        const newState = update(this.state, {
          startX: { $set: currentMouseX },
          startY: { $set: currentMouseY },
          canDrag: { $set: true },
          dotPositions: {
            [dotName]: {
              isDragging: { $set: true}
            }
          }
        });
        this.setState({ newState }, this.drawCanvas)
      }
    })

  }

  mouseWithinDot = (mouseX, mouseY, dot) => (
    mouseX > dot.x && mouseX < dot.x + dot.w && mouseY > dot.y && mouseY < dot.y + dot.h
  )
  
  drawCanvas() {
    console.log('canvasDrawn!');
    const { dotPositions, canvas } = this.state;
    const ctx = canvas.getContext('2d');
    this.clearCanvas();
    Object.keys(dotPositions).forEach((dotName) => {
      const { src, x, y, w, h } = dotPositions[dotName];
      ctx.drawImage(src, x, y, w, h);
    });
  }

  clearCanvas() {
    const { ctx, canvas } = this.state;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  mouseUp = (e) => {
    console.log('mouseUp')
    e.preventDefault(e);
    e.stopPropagation(e);
    this.setState({ canDrag: false });
    this.handleDotOnTarget()
  }

  handleDotOnTarget() {
    const { dotPositions, solutionLocations } = this.state;
    Object.keys(dotPositions).forEach((dotName, i) => {
      const currentDot = dotPositions[dotName];
      const newState = update(this.state, {
        dotPositions: {
          [dotName]: {
            isDragging: { $set: false }
          }
        }
      })
      this.setState({ newState });
      for (let solution in solutionLocations) {
        const target = solutionLocations[solution];
        if (this.isDotInCircle(target.midPoint, currentDot.x, currentDot.y)) {
          console.log('dotInCircle!');
          console.log('currentDot.type: ', currentDot.type);
          console.log('target.type: ', target.type);

        }
        // console.log('isDotInCircle: ', isDotInCircle(target.midPoint, currentDot.x, dot.y))
        if (!target.occupied && currentDot.type === target.type && this.isDotInCircle(target.midPoint, currentDot.x, currentDot.y)) {
          console.log('match!: ', currentDot, target)
          console.log('dot before: ', currentDot.x, currentDot.y)
          // currentDot.x = target.dotLocation.x;
          // dot.y = target.dotLocation.y;

          const newState = update(this.state, {
            dotPositions: {
              [dotName]: {
                x: { $set: target.dotLocation.x },
                y: { $set: target.dotLocation.y },
                notDraggable: { $set: true },
                isComplete: { $set: true }
              }
            },
            solutionLocations: {
              [solution]: {
                occupied: { $set: true }
              }
            }
          });

          this.setState({ newState }, this.drawCanvas)

          // console.log('dot after: ', dot.x, dot.y)
          setTimeout(checkFinished, 1000);
        }
      }
      !dotPositions[dotName].isComplete && this.returnDotToStart(dotName);
    })
  }

  checkFinished() {
    const { solutionLocations } = this.state;
    const count = Object.keys(solutionLocations).reduce((tv, cv) => {
      return solutionLocations[cv].occupied ? ++tv : tv;
    }, 0);
    count === 5 && alert('Task successfully complete!');
  }

  returnDotToStart(dotName){
    const initialDots = this.generateInitialDots();
    console.log('initialDots: ', initialDots);
    console.log('dotName: ', dotName);
    console.log('dot: ', initialDots[dotName]);
    console.log('dot: ', this.generateInitialDots()[dotName])
    const {x, y} = this.generateInitialDots()[dotName];
    const newState = update(this.state, {
      dotPositions: {
        [dotName]: {
          x: { $set: x },
          y: { $set: y }
        }
      }
    });
    this.setState({ newState }, this.draw);
  }

  mouseMove = (e) => {
    console.log('mouseMove')
    const { canDrag, mouseX, mouseY, dotPositions, startX, startY, offsetX, offsetY } = this.state;
    // console.log('canDrag: ', canDrag)
    if (canDrag) {
      e.preventDefault();
      e.stopPropagation();

      const currentMouseX = parseInt(e.clientX) - offsetX;
      const currentMouseY = parseInt(e.clientY) - offsetY;

      const dX = currentMouseX - startX;
      const dY = currentMouseY - startY;

      Object.keys(dotPositions).forEach((dotName) => {
        const current = dotPositions[dotName];
        const newX = current.x + dX;
        const newY = current.y + dY;
        if (current.isDragging) {
          this.updateDotPosition(dotName, newX, newY, currentMouseX, currentMouseY);
        }
      });
    }
  }

  resetPositions() {
    this.setState({
      dotPositions: this.generateInitialDots(),
    });
  }

  isDotInCircle(midPoint, dotX, dotY) {
    const distanceSquared = Math.pow((dotX - midPoint.x + 30), 2) + Math.pow((dotY - midPoint.y + 30), 2)
    // console.log('dSquared: ', distanceSquared)
    const distance = Math.sqrt(distanceSquared);
    // console.log('distance: ', distance);
    if (42.5 > (distance + 27.5)) {
      console.log('*****match!!!*****')
      return true;
    }

    return false
  }

  updateDotPosition(dotName, newX, newY, currentMouseX, currentMouseY) {
    console.log('dotPosition updated');
    const newState = update(this.state, {
      dotPositions: {
        [dotName]: {
          x: { $set: newX },
          y: { $set: newY }
        }
      },
      startX: { $set: currentMouseX },
      startY: { $set: currentMouseY }
    });
    this.setState({ newState }, this.drawCanvas);
  }

  render = () => (
    <div>
      <button onClick={ this.resetPositions }>Reset</button>
      <canvas ref="canvas" height="500" width="500" style={ style } />
      <div style={{ display: 'none' }}>
        <img ref="emptyLogo" src="/assets/ia-logo-back.png" />
        <img ref="redDot" src="/assets/ia-logo-dot-red.png" />
        <img ref="blackDot" src="/assets/ia-logo-dot-black.png" />
        <img ref="greenDot" src="/assets/ia-logo-dot-green.png" />
        <img ref="blueDot" src="/assets/ia-logo-dot-blue.png" />
      </div>
    </div>
  )
}