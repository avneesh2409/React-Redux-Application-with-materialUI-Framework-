import React from 'react';
// import Header from './components/Header';
// import Routers from './router';
import { useSelector } from 'react-redux';
// import Leftpane from './components/Leftpane';

const App = (props) => {
  const class1 = useSelector(state=>state.userActionReducer)
  return (
    <div style={class1}>
      <h1>we are in App.js file</h1>
      {/* <Dashboard /> */}
    </div >
  )
}

export default App;
