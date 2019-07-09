import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: 'Lear',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        console.log(values)
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
    
    render() {
        let { description, targetDate } = this.state
        return (
            <div className="container">
                <h2>Todo</h2>
                <Formik 
                    initialValues={{description, targetDate}} 
                    onSubmit={this.onSubmit} 
                    validate = {this.validate}
                    validateOnChange={false}
                    validateOnBlur={false}
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
            </div>
        )
    }
}

export default Todo