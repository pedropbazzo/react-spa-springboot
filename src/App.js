import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Todos from './pages/Todos';
import RouteNotFound from './pages/RouteNotFound';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/todos" component={Todos} />
          <Route path="" component={RouteNotFound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
