import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import './bootstrap.css';

// pages
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Welcome from './components/pages/Welcome';
import Todos from './components/pages/todo/Todos';
import Todo from './components/pages/todo/Todo';
import RouteNotFound from './components/pages/RouteNotFound';

// components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AuthenticatedRoute from './components/routes/AuthenticatedRoute';
import UnauthenticatedRoute from './components/routes/UnauthenticatedRoute';

// Context
import AppContext from './AppContext';
import TodoProvider from './components/pages/todo/Todo.provider'

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
            {/* <AuthenticatedRoute exact path="/todos/:id" component={Todo} /> */}
            <AuthenticatedRoute exact path="/todos/:id">
              <TodoProvider>
                <Todo />
              </TodoProvider>
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path="/todos" 
              render={
                (props) => {
                  let userId = (props.match.params.id) ? props.match.params.id : AuthenticationService.getLoggedInUser()
                  return (
                    <TodoProvider>
                      <Todos userId={userId} />
                    </TodoProvider>
                  )
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
