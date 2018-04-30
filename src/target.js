import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { moveDot } from './actions';

const dotTarget = {
  drop(props, monitor) {
    const { name: targetName, handleDrop } = props;
    const dotName = monitor.getItem().name;
    moveDot(dotName, targetName);
    handleDrop();
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
      <div className={name} style={{ display: 'inline-block' }}>
        { this.props.children }
      </div>
    )
  }
};
