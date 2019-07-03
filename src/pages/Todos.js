import React, { Component } from 'react'
import DeleteButton from '../components/DeleteButton'
import DataLoading from '../components/DataLoading'

import AuthenticationService from '../services/AuthenticationService'
import ApiService from '../services/ApiService'

class Todos extends Component {

    user = null
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            deleteMessage: null,
            loading: false,
            error: null,
            deleteButtonDisabled: null
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
                            <th>Delete</th>
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
                                        <DeleteButton 
                                            onClick={() => this.deleteTodo(todo)} 
                                            disabled={todo.id === this.state.deleteButtonDisabled}
                                        ></DeleteButton>
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
        this.setState({deleteButtonDisabled: deleteTodo.id})
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
            this.setState({deleteButtonDisabled: null})
        })
    }

}

export default Todos;