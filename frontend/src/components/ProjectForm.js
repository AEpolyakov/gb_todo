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
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({
                'users' : []
            })
            return;
        }
        let users = []
        for(let i=0; i < event.target.selectedOptions.length; i++) {
            const val = event.target.selectedOptions.item(i).value
            users.push(val)
        }
        console.log('handle values:', users)
        this.setState({
            'users' : users
        })
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
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={(event) => this.handleChange(event)}
                />

                <select multiple
                    name="users"
                    className="form-control"
                    onChange={(event) => this.handleUserChange(event)}
                >
                    {this.props.users.map((user) =>
                        <option value={user.id}>{user.first_name} {user.last_name}</option>)}
                </select>
                <input type="submit" className="btn-primary" value="Create" />
            </form>
        )
    }
}

export default ProjectForm