import React from "react";
// import { Redirect } from 'react-router-dom'
import { Form, FormInput, FormGroup } from "shards-react";
import { connect } from 'react-redux'

class LoginForm extends React.Component {

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
    
render() {
        return (
            <Form onSubmit={(e) => this.handleSignIn(e)}>
            <FormGroup >
                <label htmlFor="#email">Email</label>
                <FormInput name="email" id="#email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
                <label htmlFor="#password">Password</label>
                <FormInput name="password" type="password" id="#password" placeholder="Password" />
            </FormGroup>
            <button className="btn-primary" type="submit">Submit</button>
            </Form>
        );
    }
}

// let mapStateToProps = (state) => {
//     return { user: state.activity.activities}
// }

export default connect()(LoginForm)