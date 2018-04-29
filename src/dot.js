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
    console.log('drag begin!: ', props);
    return {
      name,
      type, 
    }
  },
  // endDrag(props, monitor, component){
  //   if (!monitor.didDrop()){
  //     console.log('did not drop!')
  //     return;
  //   }
  //   const item = monitor.getItem();
  //   const dropResult = monitor.getDropResult();

  //   console.log('dropped!: ', item, dropResult);
  // }
}

const collection = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

// @DragSource('dot', dotSource, (connect, monitor) => ({
//   connectDragSource: connect.dragSource(),
//   isDragging: monitor.isDragging(),
//   didDrop: monitor.didDrop()
// }))

@DragSource(props => props.type, dotSource, collection)
export default class Dot extends Component {
  constructor() {
    super();
  }

  render() {
    const { connectDragSource, isDragging, type } = this.props;

    const connectedDot = connectDragSource(
      <img src={`/assets/ia-logo-dot-${type}.png`} style={{ ...style }} />
    );

    return isDragging ? null : connectedDot;
    
  }
};
