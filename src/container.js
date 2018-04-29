import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Dot from './dot';
import Target from './target';
import ItemTypes from './itemTypes';
import { resetDots } from './actions';

const style = {
  width: '500px',
  height: '500px',
  border: '1px solid black',
};

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solved: false,
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
    }
  }

  // componentDidUpdate(){
  //   console.log('componentDidUpdate: ', this.props);
  //   !this.state.solved && this.checkFinished();
  // }
  // isDropped = (dotName) => this.state.droppedDotNames.includes(dotName);

  // componentWillReceiveProps(nextProps) {
  //   this.checkFinished(nextProps);
  // }

  checkFinished = (nextProps) => {
    let count = 0;
    const { dotPositions } = nextProps;
    for (let dot in dotPositions){
      const { position } = dotPositions[dot];
      position.includes('Stop') && count++;
    }
    
    count === 5 
    ? setTimeout( () => { this.setState({ solved: true }) }, 100)
    : this.state.solved && this.setState({ solved: false })
  }

  handleDrop = () => {
    // console.log('item dropped!: ', index, item);
    this.checkFinished(this.props);
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

  renderTarget = (targetName, accepts) => {
    let dot = null;
    const { dotPositions } = this.props;
    for (let dotName in dotPositions){
      const { position, type } = dotPositions[dotName];
      if (position === targetName){
        dot = <Dot name={dotName} type={type} />
      }
    }
    // if (this.props.dotPositions === targetName){
    //   dot = <Dot name:/>
    // }
    const isStart = targetName.includes('Start');
    console.log('targetName isStart: ', isStart, targetName);
    // const display = isStart ? 'inline-block' : 'block' ;

    return (
      <Target 
        className={targetName}
        name={targetName} 
        accepts={accepts} 
        handleDrop={ this.handleDrop }
        // display={ display }
      >
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

  handleReset = () => {
    this.setState({solved: false});
    resetDots();
  }

  render() {
    return (
      <div style={style}>
        <button onClick={ this.handleReset }>Reset</button>

        { this.state.solved && alert('Task Complete :)') }
  
        <div>
          {this.renderTarget('redStart', 'red')}
          {this.renderTarget('blackStart1', 'black')}
          {this.renderTarget('blackStart2', 'black')}
          {this.renderTarget('greenStart', 'green')}
          {this.renderTarget('blueStart', 'blue')}
        </div>
  

        <div style={{ 
          backgroundImage: 'url("/assets/ia-logo-back.png")',
          height: '350px',
          width: '350px',
          backgroundSize: 'cover',
          position: 'relative',
        }}>
          {this.renderTarget('redStop', 'red')}
          {this.renderTarget('blackStop1', 'black')}
          {this.renderTarget('blackStop2', 'black')}
          {this.renderTarget('greenStop', 'green')}
          {this.renderTarget('blueStop', 'blue')}
        </div>
        {/* <div>
          <img src='/assets/ia-logo-back.png'/>

        </div> */}
      </div>
    )
  }
};
