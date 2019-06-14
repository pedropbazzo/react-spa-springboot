import React from 'react'

function Todos(props) {
    const todos = (props.todos) ? props.todos : []
    const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return (
        <div className="container">
            <h1>List Todos</h1>
            {todos.length > 0 && (<table className="table">
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
                                <td>{new Date(todo.targetDate).toLocaleDateString("en-US", dateFormat)}</td>
                                {/* <td>{new Date(todo.targetDate).toLocaleDateString("hi-IN", dateFormat)}</td> */}
                            </tr>
                        )
                    }
                </tbody>
            </table>)}
        </div>
    )
}


export default Todos;