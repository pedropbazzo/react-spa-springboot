import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';

import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Todos from './pages/Todos';
import RouteNotFound from './pages/RouteNotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/todos" component={Todos} />
          <Route path="" component={RouteNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
