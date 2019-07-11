import React, {Component} from 'react';

// Context
import TodoContext from './Todo.context';

class TodoProvider extends Component {
    state = {
      todoActionStatus: null,
      todoActionMessage: ''
    }
  
    render() {
      return (
        <TodoContext.Provider value={{
          state: this.state,
          todoActionSuccess: (action) => {
            let todoActionMessage = 'SUCCESS:'
            if(action === 'add') {
              todoActionMessage += ' TODO ADDED'
            }
            if(action === 'update') {
              todoActionMessage += ' TODO UPDATED'
            }
            this.setState({
              todoActionStatus: true,
              todoActionMessage
            })
          },
          todoActionError: (action) => {
            let todoActionMessage = 'ERROR:'
            if(action === 'add') {
              todoActionMessage += ' TODO NOT ADDED'
            }
            if(action === 'update') {
              todoActionMessage += ' TODO NOT UPDATED'
            }
            this.setState({
              todoActionStatus: false,
              todoActionMessage
            })
          },
          todoActionReset: () => {
            this.setState({
              todoActionStatus: null,
              todoActionMessage: ''
            })
          }
        }} >
          {this.props.children}
        </TodoContext.Provider>
      )
    }
}

export default TodoProvider