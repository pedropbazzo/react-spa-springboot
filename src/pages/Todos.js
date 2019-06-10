import React, {Component} from 'react'
import ApiService from '../services/ApiService'
import AuthenticationService from '../services/AuthenticationService'

/*class Todos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
    }

    retrieveAllTodos(username) {
        ApiService.get(`/users/${username}/todos`)
        .then(todos => this.setState({todos}))
        .catch(error => console.log(error))
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUser()
        this.retrieveAllTodos(username)
    }
    
    render() {
        return (
            <div className="container">
                <h1>List Todos</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Completed?</th>
                            <th>Target Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(todo => 
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}*/


function Todos(props) {
    return (
        <div className="container">
            <h1>List Todos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Is Completed?</th>
                        <th>Target Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.todos.map(todo => 
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{todo.targetDate.toString()}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}


export default Todos;