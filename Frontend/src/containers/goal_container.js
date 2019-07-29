import React from 'react';
import { connect } from 'react-redux'
import GoalTypeChart from '../components/goal_type_chart'
import GoalsChart from '../components/goals_chart'
import { Card, Row, Col } from 'react-bootstrap'
import { Button, ButtonGroup } from "shards-react";
import { NavLink } from "react-router-dom"



class GoalContainer extends React.Component {
    render() { 
        return ( 
            <div>
                <Row className="d-flex justify-content-center m-3">
                    <Col>
                        <Card className="m-3">
                            <Card.Body>
                                <Card.Title>Goal Comments</Card.Title>
                                    <Card.Text>
                                    
                                    </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={4} className="m-2">
                        <h4>Goals</h4>
                        <ButtonGroup vertical>
                                    <NavLink className="btn btn-primary" to='/creategoal'> New Goal</NavLink>
                                    <NavLink className="btn btn-primary" to='/editgoal'> Edit Goal</NavLink>
                                    <Button className="mb-2">Delete Goal</Button>
                        </ButtonGroup>
                    </Col>
                   

                    <Col md={4}>
                        <Card className="m-3" id="activeGoalsCard">
                            <Card.Body>
                                <Card.Title>Active Goals</Card.Title>
                                    <Card.Text>
                                    {this.props.goalStats.pending_goals.map(pendingGoal => <p>Distance: {pendingGoal.distance}, Type: {pendingGoal.category}</p> )}
                                    </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                  
                </Row>
                <Row className="d-flex justify-content-center m-1">
                    <Col md={5} className="m-2">
                        <GoalsChart />
                    </Col>
                    <Col md={6}>
                        <GoalTypeChart/>
                    </Col>
                </Row>
            </div>
         );
    }
}

let mapStateToProps = (state) => {
    return { userGoals: state.user.userInfo.goals, user: state.user.userInfo, goalStats: state.user.userInfo.goal_stats}
}

export default connect(mapStateToProps)(GoalContainer)