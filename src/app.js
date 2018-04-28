import React from 'react';
import ReactDOM from 'react-dom';
import Main from './index';
import { observe } from './actions';

// const App = () => (
//   <div>
//     <Main />
//   </div>
// );

observe((dotPositions) => {
  ReactDOM.render(<Main dotPositions={ dotPositions } />, document.getElementById('app'));
});
