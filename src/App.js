import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';

import Login from './pages/Login';
import Welcome from './pages/Welcome';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/welcome" component={Welcome} />
      </Router>
    </div>
  );
}

export default App;
