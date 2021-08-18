import React from 'react'

class ProjectForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {name: '', users: []}
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log([event.target.name]: event.target.value)
    }
    handleSubmit(event){
        console.log(this.state.name)
        console.log(this.state.users)
        this.props.createProject(this.state.name, this.state.users)
        event.preventDefault()
    }

    render(){
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <h4>Create project</h4>
                <div className="form-group">
                    <label for="login">name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={(event) => this.handleChange(event)}
                    />
                </div>

                <div className="form-group">
                    <label for="users">users</label>
                    <input
                        type="number"
                        className="form-control"
                        name="users"
                        value={this.state.users}
                        onChange={(event) => this.handleChange(event)}
                    />
                </div>
                <input type="submit" className="btn-primary" value="Save" />
            </form>
        )
    }
}

export default ProjectForm