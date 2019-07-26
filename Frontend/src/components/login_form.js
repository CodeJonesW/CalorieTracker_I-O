import React from "react";
// import { Redirect } from 'react-router-dom'
import { Form, FormInput, FormGroup } from "shards-react";
import { connect } from 'react-redux'
import { Fade, Button, ButtonGroup } from "shards-react";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          visible: false
        };
      }
    
      toggle() {
        this.setState({
          visible: !this.state.visible
        });
      }



    handleSignIn = (e) => {
        e.preventDefault()
        console.log(e.target.email.value)

		if(e.target.email.value && e.target.password.value) {
			fetch('http://localhost:3000/login',{
		    method: 'POST',
		    headers: { Accept: 'application/json', 'Content-Type':'application/json' },
		    body: JSON.stringify({
                user: {
					email: e.target.email.value.toLowerCase(),
                    password: e.target.password.value
                }
		    })
		  })
          .then(res => res.json())
		  .then(res => {
            //   console.log(res)
		  	if (res.jwt) {
                  localStorage.setItem('jwt_token', res.jwt)
                  this.props.dispatch({type: "UPDATE_USER", user: res.user})
		  		// localStorage.setItem('healthTracker_Id', res.user.id)
		  		// this.setState({ redirect: <Redirect to='/' /> })
                //   this.props.logUser(true)
                //   console.log(localStorage)
		  	}
		//   	else if(res.errors)
		//   		this.setState({ errors: res.errors })
		  })
		// 	e.target.reset
        }
    }


    handleSignUp = (e) => {
        e.preventDefault()
		if(e.target.email.value && e.target.password.value) {
			fetch('http://localhost:3000/signup',{
		    method: 'POST',
		    headers: { Accept: 'application/json', 'Content-Type':'application/json' },
		    body: JSON.stringify({
                user: {
					email: e.target.email.value.toLowerCase(),
                    password: e.target.password.value,
                    username: e.target.username.value,
                    name: e.target.name.value,
                    age: e.target.age.value,
                    weight: e.target.weight.value,
                    gender: e.target.gender.value,
                    height: e.target.height.value
                }
		    })
		  })
          .then(res => res.json())
		  .then(res => {
		  	if (res.jwt) {
                  localStorage.setItem('jwt_token', res.jwt)
                  this.props.dispatch({type: "UPDATE_USER", user: res.user})
		  	}
		  })
			// e.target.reset
        }
    }
        
    
render() {
        return (
            <div>
            <Form onSubmit={(e) => this.handleSignIn(e)} style={{position: "relative", width: 300, height: 550}}>
            <FormGroup >
                <label htmlFor="#email">Email</label>
                <FormInput name="email" id="#email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
                <label htmlFor="#password">Password</label>
                <FormInput name="password" type="password" id="#password" placeholder="Password" />
            </FormGroup>
                <ButtonGroup horizontal  className="loginButtonGroup">
                    <Button className="mb-2" type="submit">Login</Button>
                    <Button onClick={this.toggle} className="mb-2">Sign up!</Button>
                </ButtonGroup>
            </Form>
                <Fade in={this.state.visible}>
                    <Form onSubmit={(e) => this.handleSignUp(e)} style={{position: "relative", width: 300, height: 550, margin: '20px'}}>
                    <h3>New User</h3>
                        <FormGroup >
                            <label htmlFor="#username">Username</label>
                            <FormInput name="username" id="#username" placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="#password">Password</label>
                            <FormInput name="password" type="password" id="#password" placeholder="Password" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="#name">Name</label>
                            <FormInput name="name" type="name" id="#name" placeholder="Name" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="#email">Email</label>
                            <FormInput name="email" id="#email" placeholder="Email" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="#age">Age</label>
                            <FormInput name="age" id="#age" placeholder="Age" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="#gender">Gender</label>
                            <FormInput name="gender" id="#gender" placeholder="Gender" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="#height">Height</label>
                            <FormInput name="height" id="#height" placeholder="Height" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="#weight">Weight</label>
                            <FormInput name="weight" id="#weight" placeholder="Weight" />
                        </FormGroup>
                            <Button className="mb-2" type="submit">Submit</Button>
                        </Form>
                    </Fade>
            </div>
        );
    }
}

export default connect()(LoginForm)