import React, {Component} from 'react';

// Context
import TodoContext from './Todo.context';

class TodoProvider extends Component {
    state = {
      todoUpdateStatus: null
    }
  
    render() {
      return (
        <TodoContext.Provider value={{
          state: this.state,
          resetUpdateTodo: () => {this.setState({todoUpdateStatus: null})},
          updateTodoSuccess: () => {this.setState({todoUpdateStatus: true})},
          updateTodoError: () => {this.setState({todoUpdateStatus: false})}
        }} >
          {this.props.children}
        </TodoContext.Provider>
      )
    }
}

export default TodoProvider