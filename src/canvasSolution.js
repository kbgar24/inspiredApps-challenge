import React, { Component } from 'react';

const style = {
  border: '1px solid black'
}

let currentDots;

// const emptyLogo = <img src='/assets/ia-logo-back.png' />;

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount(){
    this.createCanvas();
  }

  componentDidUpdate(){
    this.updateCanvas();
  }

  createCanvas(){
    const { canvas, emptyLogo, redDot, blackDot, greenDot, blueDot } = this.refs;
    const ctx = this.refs.canvas.getContext('2d');

    const initialDots = [
      {
        x: 75,
        y: 25,
        w: 55,
        h: 55,
        src: redDot,
        type: 'red',
        isDragging: false,
      },
      {
        x: 150,
        y: 25,
        w: 55,
        h: 55,
        src: blackDot,
        type: 'black',
        isDragging: false,
      },
      {
        x: 220,
        y: 25,
        w: 55,
        h: 55,
        src: blackDot,
        type: 'black',
        isDragging: false,
      }, {
        x: 290,
        y: 25,
        w: 55,
        h: 55,
        src: greenDot,
        type: 'green',
        isDragging: false,
      }, {
        x: 365,
        y: 25,
        w: 55,
        h: 55,
        src: blueDot,
        type: 'blue',
        isDragging: false,
      },
    ];

    dotPositions = initialDots;
    // this.setState({ dotPositions: initialDots })

    
    ctx.drawImage(emptyLogo, 75, 100, 350, 350);
    initialDots.forEach(({ src, x, y, w, h }) => {
      console.log('newDot!: ', src, x, y, w, h)
      ctx.drawImage(src, x, y, w, h);
    })
  }
  
  updateCanvas(){
    const { canvas, emptyLogo, redDot, blackDot, greenDot, blueDot } = this.refs;
    const ctx = this.refs.canvas.getContext('2d');
    const canvasBounds = canvas.getBoundingClientRect();
    const offsetX = canvasBounds.left;
    const offsetY = canvasBounds.top;
    let canDrag = true;
    let mouseX;
    let mouseY;
    
    // console.log('initialdots: ', initialDots);
    const dotPositions = this.state.dotPositions;
    console.log('canvas: ', this.refs.canvas);
    // ctx.fillRect(0,0,100,100);
  

     const mouseWithinDot = (dot) => (
       mouseX > dot.x
         && mouseX < dot.x + dot.width
         && mouseY > dot.y
         && mouseY < dot.y + dot.height
     )

     let startX;
     let startY;

    const mouseDown = (e) => { 
      console.log('mouse down') 
      e.preventDefault();
      e.stopPropagation();
      const mouseX = parseInt(e.clientX) - offsetX;
      const mouseY = parseInt(e.clientY) - offsetY;
      canDrag = false;

      for (let dot of dotPositions){
        if (mouseWithinDot(dot)){
          canDrag = true;
          dot.isDragging = true;
        }
      }

      startX = mouseX;
      startY = mouseY;

    } 
    const mouseUp = (e) => { 
      e.preventDefault();
      e.stopPropagation();
      canDrag = false;
      // console.log('dotPositionsin mU: ', dotPositions);
      for (let dot of dotPositions) {
        console.log('dot in mU: ', dot);
        dot.isDragging = false;
      }
     }

    const mouseMove = (e) => {  
      if (canDrag){
        e.preventDefault();
        e.stopPropagation();

        const mouseX = parseInt(e.clientX) - offsetX;
        const mouseY = parseInt(e.clientY) - offsetY;

        const dX = mouseX - startX;
        const dY = mouseY - startY;
        
        for (let dot of dotPositions) {
          if (dot.isDragging) {
            dot.x += dX;
            dot.y += dY;
          }
        }

        draw();

        startX = mouseX;
        startY = mouseY;

      }
    }

  

    const clearCanvas = () => {
      ctx.clearRect(0,0, canvas.width, canvas.height)
    }

    const draw = () => {
      clearCanvas();
      dotPositions.forEach(({ src, x, y, w, h }) => {
        ctx.drawImage(src, x, y, w, h);
      })
    }

    
    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp
    canvas.onmousemove = mouseMove
     
    // ctx.drawImage(redDot, 75, 25, 55, 55);
    // ctx.drawImage(blackDot, 150, 25, 55, 55);
    // ctx.drawImage(blackDot, 220, 25, 55, 55);
    // ctx.drawImage(greenDot, 290, 25, 55, 55);
    // ctx.drawImage(blueDot, 365, 25, 55, 55);
    
    
  }

  render = () => (
    <div>
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


// // get canvas related references
// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");
// var BB = canvas.getBoundingClientRect();
// var offsetX = BB.left;
// var offsetY = BB.top;
// var WIDTH = canvas.width;
// var HEIGHT = canvas.height;

// // drag related variables
// var dragok = false;
// var startX;
// var startY;

// // an array of objects that define different rectangles
// var rects = [];
// rects.push({
//   x: 75 - 15,
//   y: 50 - 15,
//   width: 30,
//   height: 30,
//   fill: "#444444",
//   isDragging: false
// });
// rects.push({
//   x: 75 - 25,
//   y: 50 - 25,
//   width: 30,
//   height: 30,
//   fill: "#ff550d",
//   isDragging: false
// });
// rects.push({
//   x: 75 - 35,
//   y: 50 - 35,
//   width: 30,
//   height: 30,
//   fill: "#800080",
//   isDragging: false
// });
// rects.push({
//   x: 75 - 45,
//   y: 50 - 45,
//   width: 30,
//   height: 30,
//   fill: "#0c64e8",
//   isDragging: false
// });

// // listen for mouse events
// canvas.onmousedown = myDown;
// canvas.onmouseup = myUp;
// canvas.onmousemove = myMove;

// // call to draw the scene
// draw();

// // draw a single rect
// function rect(x, y, w, h) {
//   ctx.beginPath();
//   ctx.rect(x, y, w, h);
//   ctx.closePath();
//   ctx.fill();
// }

// // clear the canvas
// function clear() {
//   ctx.clearRect(0, 0, WIDTH, HEIGHT);
// }

// // redraw the scene
// function draw() {
//   clear();
//   ctx.fillStyle = "#FAF7F8";
//   rect(0, 0, WIDTH, HEIGHT);
//   // redraw each rect in the rects[] array
//   for (var i = 0; i < rects.length; i++) {
//     var r = rects[i];
//     ctx.fillStyle = r.fill;
//     rect(r.x, r.y, r.width, r.height);
//   }
// }


// // handle mousedown events
// function myDown(e) {

//   // tell the browser we're handling this mouse event
//   e.preventDefault();
//   e.stopPropagation();

//   // get the current mouse position
//   var mx = parseInt(e.clientX - offsetX);
//   var my = parseInt(e.clientY - offsetY);

//   // test each rect to see if mouse is inside
//   dragok = false;
//   for (var i = 0; i < rects.length; i++) {
//     var r = rects[i];
//     if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
//       // if yes, set that rects isDragging=true
//       dragok = true;
//       r.isDragging = true;
//     }
//   }
//   // save the current mouse position
//   startX = mx;
//   startY = my;
// }


// // handle mouseup events
// function myUp(e) {
//   // tell the browser we're handling this mouse event
//   e.preventDefault();
//   e.stopPropagation();

//   // clear all the dragging flags
//   dragok = false;
//   for (var i = 0; i < rects.length; i++) {
//     rects[i].isDragging = false;
//   }
// }


// // handle mouse moves
// function myMove(e) {
//   // if we're dragging anything...
//   if (dragok) {

//     // tell the browser we're handling this mouse event
//     e.preventDefault();
//     e.stopPropagation();

//     // get the current mouse position
//     var mx = parseInt(e.clientX - offsetX);
//     var my = parseInt(e.clientY - offsetY);

//     // calculate the distance the mouse has moved
//     // since the last mousemove
//     var dx = mx - startX;
//     var dy = my - startY;

//     // move each rect that isDragging 
//     // by the distance the mouse has moved
//     // since the last mousemove
//     for (var i = 0; i < rects.length; i++) {
//       var r = rects[i];
//       if (r.isDragging) {
//         r.x += dx;
//         r.y += dy;
//       }
//     }

//     // redraw the scene with the new rect positions
//     draw();

//     // reset the starting mouse position for the next mousemove
//     startX = mx;
//     startY = my;

//   }
// }