import React, { Component } from 'react';
import Container from './container';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CanvasSolution from './canvasSolution';
// import CanvasSolution2 from './canvasSolution2';



export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render = () => (
    <div>
      {/* <img src="/assets/logo-white.png"/>
      <div style={{ color: 'white' }}>
        JS Challenge. The InspiringApps logo has lots its dots! Help restore them!
      </div>
      <Tabs>
        <TabList>
          <Tab> Seperate DOM Elements </Tab>
          <Tab> HTML5 Canvas </Tab>
        </TabList>
        <TabPanel>
          <h1>MainContent</h1> */}
          <Container dotPositions={this.props.dotPositions} style={{ backgroundColor: 'white' }}/>
        {/* </TabPanel>
        <TabPanel>
          <h2>Other Content</h2>
          <CanvasSolution2 />
        </TabPanel>
      </Tabs> */}
    </div>
  )
}