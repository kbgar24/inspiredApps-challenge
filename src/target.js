import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Dot from './dot';
import { moveDot } from './actions';

const style = {
  border: '1px solid black',
  borderRadius: '50%',
  height: '35px',
  width: '35px',
  marginTop: '50px',
};

const dotTarget = {
  drop(props, monitor) {
    // moveDot(props.name);
    console.log('dot dropped!: ', props);
    console.log(props.onDrop(monitor.getItem()));
  },
};

const collect = (connect, monitor) => {
  return { connectDropTarget: connect.dropTarget()}
}

// @DropTarget(props => {console.log('props: ', props); return props.accepts;}, dotTarget, (connect, monitor) => ({
//   connectDropTarget: connect.dropTarget(),
//   isOver: monitor.isOver(),
//   // canDrop: monitor.canDrop(),
// }))


@DropTarget('dot', dotTarget, collect)
export default class Target extends Component {
  constructor(props) {
    super(props);
  }

  render () {

    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={style}>
        {/* { canDrop && console.log('candrop!') } */}
        {/* { isOver && console.log('isOver!') } */}
        { this.props.children }
      </div>
    )
  }
};
