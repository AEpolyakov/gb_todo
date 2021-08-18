import React from 'react'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import FooterPage from './components/footer.js'
import MenuPage from './components/menu.js'
import {ProjectList, ProjectSingle} from './components/Projects.js'
import {TodoList} from './components/Todos.js'
import {HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm.js'
import Cookies from 'universal-cookie'
import ProjectForm from './components/ProjectForm.js'

const NotFound404 = ({ location }) => {
  return (
    <div id='table'>
        <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            'users' : [],
            'projects': [],
            'project': [],
            'todos': [],
            'token': '',
            'login': ''
        }
        this.get_token_from_storage()
    }

    is_auth(){
        return !!this.state.token
    }

    get_token_from_storage(){
        const cookie = new Cookies()
        const token = cookie.get('token')
        const login = cookie.get('login')
        this.setState({'token': token, 'login': login}, this.get_data)
    }

    get_headers(){
        let headers = {
            'Content-Type': 'application/json'
        }
        const cookie = new Cookies()
        headers['Authorization'] = 'token ' + cookie.get('token')
        return headers
    }

    get_data(){
        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/users/', {headers})
        .then(
            response => {
                const users = response.data.results
                this.setState({
                    'users': users,
                })
            }
        ).catch(
            error => {
                this.setState({'users': []})
                console.log(error)
            }
        )

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(
            response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects
                })
            }
        ).catch(
            error => {
                this.setState({'projects': []})
                console.log(error)
            }
        )

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
        .then(
            response => {
                const todos = response.data.results
                this.setState({
                    'todos': todos
                })
            }
        ).catch(
            error => {
                this.setState({'todo': []})
                console.log(error)
            }
        )
    }

    get_token(login, password){
        axios.post('http://127.0.0.1:8000/api-token-auth/', {"username": login, "password": password})
        .then(
            response => {
                const token = response.data.token
                const cookie = new Cookies()
                cookie.set('token', token)
                cookie.set('login', login)
                this.setState({'token': token, 'login': login}, this.get_data)
            }
        ).catch(
            error => {
                this.setState({'login': '', 'token': ''}, this.get_data)
                console.log(error)
            }
        )
    }

    logout(){
        const cookie = new Cookies()
        cookie.set('token', '')
        this.setState({'token': ''}, this.get_data)
    }

    componentDidMount(){
        this.get_token_from_storage()
        console.log('did mount', this.state)
    }

    deleteTodo(id){
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers})
        .then(response => this.get_data())
        .catch(error => console.log(error))
    }

    deleteProject(id){
        console.log('delete prj', id)

        const headers = this.get_headers()
        console.log('headers', headers)
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
        .then(response => this.get_data())
        .catch(error => console.log(error))
    }

    createProject(name, users){
        const headers = this.get_headers()
        const data = {name: name, users: ["1"]}
        console.log('create proj. name:', name, ' users:', users)
        axios.post('http://127.0.0.1:8000/api/projects/', data, {headers})
            .then(response => {
                let new_project = response.data
                const users = this.state.users.filter((user) => user.id === new_project.users)[0]
                new_project.users = users
                this.get_data()
            }).catch(error => console.log(error))
    }

    render(){
        return (
        <div class="content">
            <HashRouter>
                <nav class="menu">
                    <Link to="/users/" class="active">Users</Link>
                    <Link to="/projects/">Projects</Link>
                    <Link to="/todos/">Todo</Link>
                    {this.is_auth() ?
                        <div>
                            <Link class="align-right" onClick={() => this.logout()}>logout</Link>
                            <a class="align-right">Hello, {this.state.login}</a>
                        </div>:
                        <Link class="align-right" to="/login/">Login</Link>
                    }
                </nav>
                <Switch>
                    <Route exact path='/projects/create'>
                        <ProjectForm
                            users={this.state.users}
                            createProject={(name, users) => this.createProject(name, users)} />
                    </Route>
                    <Route exact path='/users/' component={() => <UserList users={this.state.users} />} />
                    <Route exact path='/projects/'>
                        <ProjectList
                            projects={this.state.projects}
                            users={this.state.users}
                            deleteProject={(id) => this.deleteProject(id)}
                        />
                    </Route>
                    <Route exact path='/todos/'>
                        <TodoList
                            todos={this.state.todos}
                            projects={this.state.projects}
                            users={this.state.users}
                            deleteTodo={(id) => this.deleteTodo(id)}
                        />
                    </Route>
                    <Route path='/projects/:id'>
                        <ProjectSingle todos={this.state.todos} projects={this.state.projects} users={this.state.users} />
                    </Route>
                    <Route exact path='/login/'>
                        <LoginForm get_token={(login, password) => this.get_token(login, password)} />
                    </Route>
                    <Route exact path='/'>
                        {this.is_auth() ?
                            <Redirect to='/users'  />:
                            <Redirect to='/login'  />
                        }
                    </Route>
                    <Route component={NotFound404} />
                </Switch>
            </HashRouter>
            <FooterPage/>
        </div>
        )
    }
}

export default App;
