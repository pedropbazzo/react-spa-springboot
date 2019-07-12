import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import ClickButton from '../../htmlElement/ClickButton'
import DataLoading from '../../effects/DataLoading'

import AuthenticationService from '../../../services/AuthenticationService'
import ApiService from '../../../services/ApiService'

import TodoContext from './Todo.context'

class Todos extends Component {

    user = null
    todoContext = null
    
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            deleteMessage: null,
            loading: false,
            apiError: null,
            buttonDisabled: null
        }
        this.user = (props.userId) ? props.userId : AuthenticationService.getLoggedInUser()
    }

    componentDidMount() {
        this.setState({loading: true})
        ApiService.get(`/users/${this.user}/todos`)
            .then(todos => this.setState({todos}))
            .catch(error => this.setState({apiError: error.message}))
            .finally(() => this.setState({loading: false}))
    }

    render() {
        const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        if(this.state.loading) {
            return <DataLoading fetchingText="Fetching Todos" />
        }

        return (
            <TodoContext.Consumer>
                {(context) => {
                    this.todoContext = context
                    return (
                        <div className="container">
                            {this.state.apiError && (<div className="alert alert-danger">{this.state.apiError}</div>)}
                            {this.state.deleteMessage && (<div className="alert alert-success">{this.state.deleteMessage}</div>)}
                            {(context.state.todoActionStatus === true) && (<div className="alert alert-success">{context.state.todoActionMessage}</div>)}
                            {(context.state.todoActionStatus === false) && (<div className="alert alert-danger">{context.state.todoActionMessage}</div>)}
                            {this.state.todos.length > 0 && (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Is Completed?</th>
                                            <th>Target Date</th>
                                            <th><span className="float-left">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.todos.map(todo => 
                                                <tr key={todo.id}>
                                                    <td>{todo.description}</td>
                                                    <td>{todo.done.toString()}</td>
                                                    <td>{new Date(todo.targetDate).toLocaleDateString("en-US", dateFormat)}</td>
                                                    <td>
                                                        <div className="float-left" style={{"margin": "0px 2px"}}>
                                                            <ClickButton 
                                                                btnType="update"
                                                                onClick={() => this.updateTodo(todo)} 
                                                                disabled={todo.id === this.state.buttonDisabled}
                                                            />
                                                        </div>
                                                        <div className="float-left" style={{"margin": "0px 2px"}}>
                                                            <ClickButton 
                                                                btnType="delete"
                                                                onClick={() => this.deleteTodo(todo)} 
                                                                disabled={todo.id === this.state.buttonDisabled}
                                                            />
                                                        </div>                                      
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>)}
                                <div className="row">
                                    <ClickButton 
                                        btnType="add"
                                        onClick={() => this.addTodo()}
                                    />
                                </div>
                            </div>
                        )
                    }
                }
            </TodoContext.Consumer>
        )
    }
    
    deleteTodo(deleteTodo) {
        const deleteUrl = ApiService.getRestEndPointUrl(`/users/${this.user}/todos/${deleteTodo.id}`)
        this.setState({buttonDisabled: deleteTodo.id})
        ApiService.delete(deleteUrl)
        .then(() => {
            const refreshedTodos = this.state.todos.filter(function(todo) {
                return deleteTodo !== todo
            })

            this.todoContext.todoActionReset()
            
            this.setState({
                todos: refreshedTodos,
                //deleteMessage: `Todo ${deleteTodo.description} deleted successfully`
                deleteMessage: 'SUCCESS: TODO DELETED'
            })
        })
        .catch((error) => {
            this.setState({
                error: error.message,
                deleteMessage: null
            })
        })
        .finally(() => {
            this.setState({buttonDisabled: null})
        })
    }

    updateTodo(updateTodo) {
        this.props.history.push(`/todos/${updateTodo.id}`)
    }

    addTodo() {
        this.props.history.push('/todos/add')
    }

}

export default withRouter(Todos)