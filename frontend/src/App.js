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
            'token': ''
        }
    }

    get_token_from_storage(){
        const cookie = new Cookies()


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
        console.log('headers: ', headers)

        axios.get('http://127.0.0.1:8000/api/users/', {headers})
        .then(
            response => {
                const users = response.data.results
                this.setState({
                    'users': users
                })
            }
        ).catch(
            error => console.log(error)
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
            error => console.log(error)
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
            error => console.log(error)
        )
    }

    componentDidMount(){
        this.get_data()
    }

    get_token(login, password){
        axios.post('http://127.0.0.1:8000/api-token-auth/', {"username": login, "password": password})
        .then(
            response => {
                const token = response.data.token
                const cookie = new Cookies()
                cookie.set('token', token)
                this.setState('token', token)
                this.get_data()

            }
        ).catch(
            error => console.log(error)
        )
    }


    render(){
        return (
        <div class="content">
            <HashRouter>
                <nav class="menu">
                    <Link to="/users/" class="active">Users</Link>
                    <Link to="/projects/">Projects</Link>
                    <Link to="/todos/">Todo</Link>
                    <Link to="/login/">Login</Link>
                </nav>
                <Switch>
                    <Route exact path='/login/'>
                        <LoginForm get_token={(login, password) => this.get_token(login, password)} />
                    </Route>
                    <Route exact path='/users/' component={() => <UserList users={this.state.users} />} />
                    <Route exact path='/projects/' component={() => <ProjectList projects={this.state.projects} />} />
                    <Route exact path='/todos/'>
                        <TodoList todos={this.state.todos} projects={this.state.projects} users={this.state.users}/>
                    </Route>
                    <Route path='/projects/:id'>
                        <ProjectSingle todos={this.state.todos} projects={this.state.projects} users={this.state.users} />
                    </Route>
                    <Route exact path='/'>
                        <Redirect to='/users'  />
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
