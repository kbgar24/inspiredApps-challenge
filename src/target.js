import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { moveDot } from './actions';

// const style = {
//   border: '1px solid black',
//   borderRadius: '50%',
//   height: '35px',
//   width: '35px',
//   marginTop: '50px',
//   display: 'inline-block',
// };

const dotTarget = {
  drop(props, monitor) {
    const { name: targetName, handleDrop } = props;
    const dotName = monitor.getItem().name;
    moveDot(dotName, targetName);
    console.log('dot dropped!: ', props);
    console.log(monitor.getItem());
  },
  canDrop(props, monitor){
    return !props.children
  },
};

const collect = (connect, monitor) => {
  return { 
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
  }
}

@DropTarget(props => props.accepts, dotTarget, collect)
export default class Target extends Component {
  constructor(props) {
    super(props);
  }

  render () {

    const { connectDropTarget, canDrop, name } = this.props;
    return connectDropTarget(
      <div className={name}>
        { this.props.children }
      </div>
    )
  }
};
