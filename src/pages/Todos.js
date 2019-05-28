import React, {Component} from 'react'

class Todos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [
                {id: 1, description: 'Wake Up', done: false, targetDate: new Date()},
                {id: 2, description: 'Exercise', done: false, targetDate: new Date()},
                {id: 3, description: 'Eat Breakfast', done: false, targetDate: new Date()},
                {id: 4, description: 'Shower', done: false, targetDate: new Date()}
            ]
        }
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
}

export default Todos;