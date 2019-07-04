import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import './bootstrap.css';

// pages
import Login from './pages/Login';
import Logout from './pages/Logout';
import Welcome from './pages/Welcome';
import Todos from './pages/Todos';
import Todo from './pages/Todo';
import RouteNotFound from './pages/RouteNotFound';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

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
            <UnauthenticatedRoute path="/" exact component={Login} />
            <UnauthenticatedRoute path="/login" component={Login} />
            <AuthenticatedRoute path="/logout" component={Logout} />
            <AuthenticatedRoute path="/welcome" component={Welcome} />
            <AuthenticatedRoute exact path="/todos/:id" component={Todo} />
            <AuthenticatedRoute exact path="/todos" 
              render={
                (props) => {
                  let userId = (props.match.params.id) ? props.match.params.id : AuthenticationService.getLoggedInUser()
                  return <Todos userId={userId} />
                }
              } 
            />
            <Route path="" component={RouteNotFound} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
