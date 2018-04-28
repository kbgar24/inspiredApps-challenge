import React, { Component } from 'react';
import { DragSource } from 'react-dnd';


const style = {
  borderRadius: '50%',
  height: '25px',
  width: '25px',
  backgroundColor: 'red',
  marginTop: '50px',
};

const dotSource = {
  beginDrag(props) {
    console.log('drag begin!: ', props);
    return {
      name: props.name
    }
  }
}

@DragSource(props => props.type, dotSource, (connect, monitor) => {
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default class Dot extends Component {
  constructor() {
    super();
  }

  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div style={style}>
      </div>
    );
    
  }
};
