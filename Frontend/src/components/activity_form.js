import React, { Component } from "react"
import { Form, FormInput, FormGroup, FormSelect } from "shards-react"
import { Button, ButtonGroup } from "shards-react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { fetchUser } from "../actions/user_actions"
import SplashEditActivityDiv from "../components/splash_edit_activity"

class ActivityForm extends Component {
  state = {
    redirect: null
  }

  handleCreateActivity = e => {
    e.preventDefault()

    fetch("http://localhost:3000/activities", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.jwt_token}`
      },
      body: JSON.stringify({
        activity: {
          category: e.target.category.value.toLowerCase(),
          calories_burned: e.target.calories_burned.value,
          distance: e.target.distance.value,
          user_id: this.props.user.userInfo.id
        }
      })
    }).then(res => res.json())
    fetchUser().then(res => {
      this.props.dispatch({ type: "UPDATE_USER", user: res.user })
    })
    this.setState({ redirect: <Redirect to="/activities" /> })

    // }
    //   	else if(res.errors)
    //   		this.setState({ errors: res.errors })
    //   })
    // 	e.target.reset
    // }
  }

  render() {
    return (
      <SplashEditActivityDiv>
        <Form
          onSubmit={e => this.handleCreateActivity(e)}
          style={{
            position: "relative",
            width: 300,
            height: 550,
            margin: "20px"
          }}
        >
          {this.state.redirect}
          <FormGroup>
            <FormSelect name="category">
              <option value="run">Run</option>
              <option value="walk">Walk</option>
              <option value="bike">Bike</option>
              <option value="swim">Swim</option>
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <FormInput
              type="number"
              min="1"
              max="5000"
              name="calories_burned"
              id="#calories_burned"
              placeholder="# Calories Burned"
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              name="distance"
              type="number"
              step="0.1"
              min="0"
              max="200"
              id="#distance"
              placeholder="# of Miles"
            />
          </FormGroup>
          <ButtonGroup horizontal="true">
            <Button className="btn btn-primary" type="submit">
              Submit
            </Button>
            <NavLink className="btn btn-primary" to="/activities">
              Back
            </NavLink>
          </ButtonGroup>
        </Form>
      </SplashEditActivityDiv>
    )
  }
}

let mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(ActivityForm)
