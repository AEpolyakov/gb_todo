import React from 'react'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Users.js'
import FooterPage from './components/footer.js'
import MenuPage from './components/menu.js'

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            'users' : [],
        }

    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/users/')
        .then(
            response => {

                const users = response.data
                console.log('users', users)
                this.setState({
                    'users': users
                })
            }
        ).catch(
            error => console.log(error)
        )
    }

    render(){
        return (
        <div class="content">
            <MenuPage/>
            <AuthorList users={this.state.users} />
            <FooterPage/>
        </div>
        )
    }
}

export default App;
