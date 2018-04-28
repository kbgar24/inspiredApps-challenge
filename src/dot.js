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
    const { name, type } = props;
    console.log('drag begin!: ', props);
    return {
      name, 
      type
    }
  },
  endDrag(props, monitor, component){
    if (!monitor.didDrop()){
      console.log('did not drop!')
      return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    console.log('dropped!: ', item, dropResult);
  }
}

@DragSource('dot', dotSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  didDrop = monitor.didDrop();
}))

export default class Dot extends Component {
  constructor() {
    super();
  }

  render() {
    const { connectDragSource, type:backgroundColor, didDrop } = this.props;

    didDrop && alert('dropped!');

    return connectDragSource(
      <div style={{ ...style, backgroundColor }}>
      </div>
    );
    
  }
};
