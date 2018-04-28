import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Dot from './dot';
import Target from './target';
import ItemTypes from './itemTypes';

const style = {
  width: '500px',
  height: '500px',
  border: '1px solid black',
};

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);
  }
  //   this.state = {
  //     dots: [
  //       { name: 'RED_DOT', type: ItemTypes.RED, start: 'redDotStart' },
  //       { name: 'BLACK_DOT_1', type: ItemTypes.BLACK, start: 'blackDotStart' }
        
  //     ],
  //     targets: [
  //       { accepts: ItemTypes.RED, name: 'redTarget' },
  //       { accepts: ItemTypes.BLACK, name: 'blackTarget1' },
  //       { accepts: ItemTypes.RED, name: 'redDotStart' },
  //       { accepts: ItemTypes.BLACK, name: 'blackDotStart' },
  //     ],
  //     droppedDotNames: [];
  //   }
  // }

  // isDropped = (dotName) => this.state.droppedDotNames.includes(dotName);

  handleDrop(index, item) {
    console.log('item dropped!: ', index, item);
    // const { name } = item;
    // const droppedBoxNames = name ? { $push: [name] } : {};

    // this.setState(
    //   update(this.state, {
    //     dustbins: {
    //       [index]: {
    //         lastDroppedItem: {
    //           $set: item,
    //         }
    //       }
    //     },
    //     droppedBoxNames,
    //   })
    // )
  }

  // renderTarget = (name,, key) => {
  //   let dot = null;

  //   for (let key in this.props.dotPositions){
  //     if (dotPositions[key] === name){
  //       const {name, type} = this.state.dots.filter(dot => dot.start === key)[0]
  //       dot = <Dot 
  //         name={name}
  //         type={type}
  //       />
  //     }
  //   }


  renderTarget = (name) => {
    let dot = null;
    if (this.props.dotPosition === name){
      dot = <Dot />
    }
    return (
      <Target name={name}>
        {dot}
      </Target>
    )
  }
    // if (this.props.dotPosition === name){
    //   dot = <Dot />
    // }

    // let dotPositions = {
    //   red: 'redDotStart',
    //   black: 'blackDotStart',
    // }

  //   return (
  //     <Target
  //       accepts={accepts}
  //       name={name}
  //       key={key}
  //       onDrop={ item => this.handleDrop(index, item) }
  //     >
  //       {dot}
  //     </Target>
  //   )
  // }

  // render = () => (
  //   <div style={ style }>
  //     {/* Main Container */}
  //     {/* { 
  //       this.state.dots.map(({ name, type }, index) => (
  //         <Dot 
  //           name={name}
  //           type={type}
  //           key={index}
  //         />
  //       ))
  //     } */}
  //     {/* <div> */}

  //     {
  //       // this.state.targets.map(({ accepts, name }, index) => {
  //         //   return (
  //       //     // <Target 
  //       //     //   accepts={accepts}
  //       //     //   onDrop={ item => this.handleDrop(index, item)}
  //       //     //   key={index}
  //       //     // >
  //       //     // </Target>
  //       //     <div>
  //       //       { this.renderTarget(name, accepts, index) }
  //       //     </div>
        
  //       //   )
  //       // })
  //       this.renderTarget('start')
  //       this.renderTarget('stop')
        
  //     }
  //     {/* </div> */}
  //   </div>
  // );

  render() {
    return (
      <div style={style}>
        MainContainer
        {this.renderTarget('start')}
        {this.renderTarget('stop')}
        {/* {this.renderTarget('blue')} */}
      </div>
    )
  }
};
