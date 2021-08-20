import React from 'react'

class TodoForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {text: '', project: '', created_by: ''}
    }

    handleChange(event){
        console.log('change', event.target.name, event.target.value, this.state)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        this.props.createTodo(this.state.text, this.state.project, this.state.created_by)
        event.preventDefault()
    }

    render(){
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <h4>Add todo</h4>
                <input
                    type="text"
                    className="form-control"
                    name="text"
                    value={this.state.name}
                    onChange={(event) => this.handleChange(event)}
                />

                <select
                    name="project"
                    className="form-control"
                    onChange={(event) => this.handleChange(event)}
                >
                    {this.props.projects.map((project) =>
                        <option value={project.id}>{project.name}</option>)}
                </select>

                <select
                    name="created_by"
                    className="form-control"
                    onChange={(event) => this.handleChange(event)}
                >
                    {this.props.users.map((user) =>
                        <option value={user.id}>{user.first_name} {user.last_name}</option>)}
                </select>
                <input type="submit" className="btn-primary" value="Create" />
            </form>
        )
    }
}

export default TodoForm