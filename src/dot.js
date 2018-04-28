import React, { Component } from 'react';

const style = {
  borderRadius: '50%',
  height: '25px',
  width: '25px',
  backgroundColor: 'red',
  marginTop: '50px',
};

export default class Dot extends Component {
  constructor() {
    super();
  }

  render = () => (
    <div style={style}>
    </div>
  );
};
