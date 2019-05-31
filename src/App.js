import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import './bootstrap.css';

// pages
import Login from './pages/Login';
import Logout from './pages/Logout';
import Welcome from './pages/Welcome';
import Todos from './pages/Todos';
import RouteNotFound from './pages/RouteNotFound';

// components
import Header from './components/Header';
import Footer from './components/Footer';

// Context
import AppContext from './AppContext';

// service
import AuthenticationService from './services/AuthenticationService';


class AppProvider extends Component {
  state = {
    isUserLoggedIn: AuthenticationService.isUserLoggedIn()
  }

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        login: () => {this.setState({isUserLoggedIn: true})},
        logout: () => {this.setState({isUserLoggedIn: false})}
      }} >
        {this.props.children}
      </AppContext.Provider>
    )
  }
}


function App() {
  return (
    <AppProvider>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/todos" component={Todos} />
            <Route path="" component={RouteNotFound} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
