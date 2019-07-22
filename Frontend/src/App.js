import React from 'react';
import './App.css';
import Navbar from './components/navbar'
import AccountContainer from './containers/account_container'
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from "react-router-dom";
import Profile from './components/profile'


class App extends React.Component{

  
  componentDidMount(){
    let token = localStorage.getItem('jwt_token')
    if (token) {
      // findUser(token)
      fetch('http://localhost:3000/current_user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` }
      })
      .then(res => res.json())
      .then(res => {
        // console.log("this is it", res)
        if (res.user)
          this.props.dispatch({ type: 'UPDATE_USER', user: res.user })
      })
    }
  }


  render(){
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/profile" render={()=> localStorage.jwt_token ? <Profile/> : <Redirect to='/' /> }/>
          <Route exact path="/" render={()=> localStorage.jwt_token ? <Redirect to='/profile' /> : <AccountContainer/> } />
          {/* <Route exact path='/activities' component={<Activities/>} /> */}
        </Switch>
      </div>
    );
  }
}

  let mapStateToProps = (state) => {
    return { user: state.user}
  }



export default connect(mapStateToProps)(App)
