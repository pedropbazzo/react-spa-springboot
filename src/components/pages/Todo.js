import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';

import DataLoading from '../../components/DataLoading'

import AuthenticationService from '../../services/AuthenticationService'
import ApiService from '../../services/ApiService'
import TodoService from '../../services/TodoService';

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: {
                id: this.props.match.params.id,
                description: '',
                targetDate: moment(new Date()).format('YYYY-MM-DD')
            },
            restError: null,
            loading: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        let user = AuthenticationService.getLoggedInUser()
        let todo = {
            id: this.state.todo.id,
            description: values.description,
            targetDate: values.targetDate
        }
        
        TodoService.updateTodo(todo, user)
        .then(() => {
            this.props.history.push('/todos')
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
        let user = AuthenticationService.getLoggedInUser()
        this.setState({loading: true})
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
            .catch(error => this.setState({restError: error.message}))
            .finally(() => this.setState({loading: false}))
    }
    
    render() {
        let { description, targetDate } = this.state.todo

        if(this.state.loading) {
            return <DataLoading fetchingText="Fetching Todo" />
        }

        return (
            <div className="container">
                <h2>Todo</h2>
                {this.state.restError && (<div className="alert alert-danger">{this.state.restError}</div>)}
                {!this.state.restError && (<Formik 
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
                </Formik>)}
            </div>
        )
    }
}

export default Todo