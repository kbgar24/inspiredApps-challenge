import React, { Component } from 'react';
import update from 'immutability-helper';

const style = {
  border: '1px solid black'
}

const initialDots = () => ({
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
    name: 'greenDot'
  }, 
  blueDot: {
    x: 365,
    y: 25,
    w: 55,
    h: 55,
    src: blueDot,
    type: 'blue',
    isDragging: false,
    name: 'blueDot'
  },
});

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
    this.draw();
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
    let dotPositions = initialDots();
    
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
      dotPositions,
    })
    
    this.drawCanvas();
  }
  
  drawCanvas() {
    const { dotPositions, ctx } = this.state;
    this.clearCanvas();
    for (let dot in dotPositions) {
      const { src, x, y, w, h } = dot;
      ctx.drawImage(src, x, y, w, h);
    };
  }

  clearCanvas() {
    const { ctx, canvas } = this.state;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  mouseUp(e) {
    e.preventDefault(e);
    e.stopPropagation(e);
    this.setState({ canDrag: false });
    handleDotOnTarget()
  }

  mouseMove(e) {
    const { canDrag, mouseX, mouseY, dotPositions, startX, startY, offsetX, offsetY } = this.state;
    if (canDrag) {
      e.preventDefault();
      e.stopPropagation();

      const currentMouseX = parseInt(e.clientX) - offsetX;
      const currentMouseY = parseInt(e.clientY) - offsetY;

      const dX = currentMouseX - startX;
      const dY = currentMouseY - startY;

      Object.keys(dotPositions).forEach((name) => {
        const current = dotPositions[name];
        const newX = current.x + dX;
        const newY = current.y + dY;
        if (current.isDragging) {
          this.updateDotPosition(dotName, newX, newY);
        }
      });

      this.draw();
    }
  }
  resetPositions() {
    this.setState({
      dotPositions: initialDots();
    });
  }

  updateDotPosition(dotName, newX, newY) {
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
    this.setState({ newState });
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
