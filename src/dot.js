import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const style = {
  borderRadius: '50%',
  height: '55px',
  width: '55px',
  zIndex: 100,
  position: 'relative',
  margin: '10px',
  cursor: 'pointer'
};

const dotSource = {
  beginDrag(props) {

    const { name, type } = props;
    return {
      name,
      type, 
    }
  },
}

const collection = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

@DragSource(props => props.type, dotSource, collection)
export default class Dot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { connectDragSource, isDragging, type } = this.props;

    const connectedDot = connectDragSource(
      <img src={`/assets/img/ia-logo-dot-${type}.png`} style={{ ...style }} />
    );
    return isDragging ? null : connectedDot;
    
  }
};
