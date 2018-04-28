import React, { Component } from 'react';
import { DragSource } from 'react-dnd';


const style = {
  borderRadius: '50%',
  height: '25px',
  width: '25px',
  backgroundColor: 'red',
  zIndex: 100,
  position: 'relative',
  margin: '5px',
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

@DragSource('dot', dotSource, collection)
export default class Dot extends Component {
  constructor() {
    super();
  }

  render() {
    // const { connectDragSource, type:backgroundColor, didDrop } = this.props;
    const { connectDragSource, type } = this.props;
    // didDrop && alert('dropped!');

    return connectDragSource(
      <div style={{ ...style, backgroundColor: type }}>
      </div>
    );
    
  }
};
