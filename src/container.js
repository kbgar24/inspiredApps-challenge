import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Dot from './dot';
import Target from './target';
import ItemTypes from './itemTypes';

const style = {
  width: '500px',
  height: '500px',
  border: '1px solid black',
}

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dots: [
        { name: 'RED_DOT', type: ItemTypes.RED },
        { name: 'BLACK_DOT_1', type: ItemTypes.BLACK }
        
      ],
      targets: [
        { accepts: [ItemTypes.RED] },
        { accepts: [ItemTypes.BLACK] },
      ]
    }
  }

  render = () => (
    <div style={ style }>
      Main Container
      { 
        this.state.dots.map(({ name, type }, index) => (
          <Dot 
            name={name}
            type={type}
            key={index}
          />
        ))
      }
      <Target name='redTarget'/>
    </div>
  );
};
