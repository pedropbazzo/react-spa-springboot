import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import DataLoading from '../../effects/DataLoading'

import AuthenticationService from '../../../services/AuthenticationService'
import ApiService from '../../../services/ApiService'
import TodoService from '../../../services/TodoService';

import TodoContext from './Todo.context'

class Todo extends Component {
    
    todoContext = null

    constructor(props) {
        super(props)
        this.state = {
            todo: {
                id: this.props.match.params.id,
                description: '',
                targetDate: moment(new Date()).format('YYYY-MM-DD')
            },
            apiError: null,
            loading: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        let user = AuthenticationService.getLoggedInUser()
        let todo = {
            id: (this.state.todo.id === 'add') ? null : this.state.todo.id,
            description: values.description,
            targetDate: values.targetDate
        }
        
        TodoService.addUpdateTodo(todo, user)
        .then(() => {
            let action = 'add'
            if(todo.id) {
                action = 'update'
            } 
            this.todoContext.todoActionSuccess(action)
            this.props.history.push('/todos')
        })
        .catch(() => {
            //this.todoContext.updateTodoError()
            let apiError = 'ERROR: TODO NOT '
            if(todo.id) {
                apiError += 'UPDATED'
            } else {
                apiError += 'ADDED'
            }
            this.setState({apiError})
        })
    }

    validate(values) {
        let errors = {}
        if(!values.description.trim()) {
            errors.description = 'Enter a description'
        } else if(values.description.trim().length < 5) {
            errors.description = 'Description should contain atleast 5 characters'
        }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }
        return errors
    }

    componentDidMount() {
        if(this.state.todo.id === 'add') {
            return
        }
        
        let user = AuthenticationService.getLoggedInUser()
        this.setState({loading: true})
        
        /* calling this fn, else success/error message is always displayed when 
        just navigating from Todo to Todos */
        this.todoContext.todoActionReset() 
        
        ApiService.get(`/users/${user}/todos/${this.state.todo.id}`)
            .then(todo => {
                this.setState({
                    todo: {
                        ...this.state.todo,
                        description: todo.description,
                        targetDate: moment(todo.targetDate).format('YYYY-MM-DD')
                    }
                })
            })
            .catch(error => this.setState({apiError: error.message}))
            .finally(() => this.setState({loading: false}))
    }
    
    render() {
        let { description, targetDate } = this.state.todo

        if(this.state.loading) {
            return <DataLoading fetchingText="Fetching Todo" />
        }

        return (
            <TodoContext.Consumer>
                {(context) => {
                    this.todoContext = context
                    return (
                        <div className="container">
                            {this.state.apiError && (<div className="alert alert-danger">{this.state.apiError}</div>)}
                            <h2>Todo</h2>
                            {((this.state.todo.id === 'add') || (description.length > 0)) && (
                                <Formik 
                                    initialValues={{description, targetDate}} 
                                    onSubmit={this.onSubmit} 
                                    validate = {this.validate}
                                    validateOnChange={false}
                                    validateOnBlur={false}
                                    enableReinitialize={true}
                                >
                                    {
                                        (props) => (
                                            <Form>
                                                <fieldset className="form-group">
                                                    <label>Description</label>
                                                    <Field className={"form-control " + ((props.errors.description) ? "is-invalid" : "")} type="text" name="description" />
                                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <label>Target Date</label>
                                                    <Field className={"form-control " + ((props.errors.targetDate) ? "is-invalid" : "")} type="date" name="targetDate" />
                                                    <ErrorMessage name="targetDate" component="div" className="text-danger" />
                                                </fieldset>
                                                <button className="btn btn-success" type="submit">Save</button>
                                            </Form>
                                        )
                                    }
                                </Formik>
                            )}
                        </div>
                    )}
                }
            </TodoContext.Consumer>
        )
    }
}

export default withRouter(Todo)