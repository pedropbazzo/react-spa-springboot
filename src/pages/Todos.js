import React, { Component } from 'react'
import RestApiDeleteActionButton from '../components/RestApiDeleteActionButton'

import AuthenticationService from '../services/AuthenticationService'
import ApiService from '../services/ApiService'

class Todos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: (this.props.todos) ? this.props.todos : []
        }
        //this.removeTodoFromList = this.removeTodoFromList.bind(this)
    }

    render() {
        const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const user = AuthenticationService.getLoggedInUser()
        const deleteUrl = ApiService.getRestEndPointUrl('/users/' + user + '/todos/')

        return (
            <div className="container">
                <h1>List Todos</h1>
                {this.state.todos.length > 0 && (<table className="table">
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
                                    {/* <td>{new Date(todo.targetDate).toLocaleDateString("hi-IN", dateFormat)}</td> */}
                                    <td>
                                        <RestApiDeleteActionButton 
                                        deleteUrl={ApiService.getRestEndPointUrl(deleteUrl + todo.id)} 
                                        //deleteId={todo.id} 
                                        onDeleteSuccess = {() => this.removeTodoFromList(todo)} />
                                    </td>
                                    {/** <RestApiActionButton render= */}
                                </tr>
                            )
                        }
                    </tbody>
                </table>)}
            </div>
        )
    }

    removeTodoFromList(todo) {
        console.log(todo)
    }

}


export default Todos;