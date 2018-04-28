import React from 'react';
import ReactDOM from 'react-dom';
import Main from './index';
import { observe } from './actions';

// const App = () => (
//   <div>
//     <Main />
//   </div>
// );

observe((dotPosition) => {
  ReactDOM.render(<Main dotPosition={ dotPosition } />, document.getElementById('app'));
});
