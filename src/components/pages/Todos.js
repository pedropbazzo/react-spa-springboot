import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import ClickButton from '../../components/ClickButton'
import DataLoading from '../../components/DataLoading'

import AuthenticationService from '../../services/AuthenticationService'
import ApiService from '../../services/ApiService'

class Todos extends Component {

    user = null
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            deleteMessage: null,
            loading: false,
            error: null,
            buttonDisabled: null
        }
        this.user = (props.userId) ? props.userId : AuthenticationService.getLoggedInUser()
    }

    componentDidMount() {
        this.setState({loading: true})
        ApiService.get(`/users/${this.user}/todos`)
            .then(todos => this.setState({todos}))
            .catch(error => this.setState({error: error.message}))
            .finally(() => this.setState({loading: false}))
    }

    render() {
        const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        if(this.state.loading) {
            return <DataLoading fetchingText="Fetching Todos" />
        }

        return (
            <div className="container">
                {this.state.error && (<div className="alert alert-danger">{this.state.error}</div>)}
                {this.state.deleteMessage && (<div className="alert alert-success">{this.state.deleteMessage}</div>)}
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
            </div>
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
            this.setState({
                todos: refreshedTodos,
                deleteMessage: `Todo ${deleteTodo.description} deleted successfully`
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

}

export default withRouter(Todos)