import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import swal from 'sweetalert2';
import Dot from './dot';
import Target from './target';
import ItemTypes from './itemTypes';
import { resetDots } from './actions';

const containerStyle = {
  width: '500px',
  height: '500px',
  backgroundColor: 'white',
};

const dotStartStyle = {
  height: '80px', 
  width: '380px', 
  margin: '15px auto' 
};

const playAreaStyle = { 
  backgroundImage: 'url("/assets/ia-logo-back.png")',
  height: '350px',
  width: '350px',
  backgroundSize: 'cover',
  position: 'relative',
  margin: '10px auto',
};

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solved: false,
    }
  }

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
    this.checkFinished(this.props);
  }

  renderTarget = (targetName, accepts) => {
    let dot = null;
    const { dotPositions } = this.props;
    for (let dotName in dotPositions){
      const { position, type } = dotPositions[dotName];
      if (position === targetName){
        dot = <Dot name={dotName} type={type} />
      }
    }

    const isStart = targetName.includes('Start');

    return (
      <Target 
        className={targetName}
        name={targetName} 
        accepts={accepts} 
        handleDrop={ this.handleDrop }
      >
        {dot}
      </Target>
    )
  }

  handleReset = () => {
    this.setState({solved: false});
    resetDots();
  }

  render() {

    this.state.solved && swal("Great Job!", "You have successfully fixed the InspiredApps logo!", "success")
  
    return (
      <div>
        <button onClick={ this.handleReset } className="challenge-btn">Reset</button>
        
        <div style={containerStyle}>
          <div style={dotStartStyle}>
            {this.renderTarget('redStart', 'red')}
            {this.renderTarget('blackStart1', 'black')}
            {this.renderTarget('blackStart2', 'black')}
            {this.renderTarget('greenStart', 'green')}
            {this.renderTarget('blueStart', 'blue')}
          </div>

          <div style={playAreaStyle}>
            {this.renderTarget('redStop', 'red')}
            {this.renderTarget('blackStop1', 'black')}
            {this.renderTarget('blackStop2', 'black')}
            {this.renderTarget('greenStop', 'green')}
            {this.renderTarget('blueStop', 'blue')}
          </div>
        </div>
      </div>
    )
  }
};
