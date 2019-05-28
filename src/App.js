import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

import Login from './pages/Login';
import Welcome from './pages/Welcome';
import RouteNotFound from './pages/RouteNotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/welcome" component={Welcome} />
          <Route path="" component={RouteNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
