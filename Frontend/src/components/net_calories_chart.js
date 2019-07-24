import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux'
import { ButtonGroup, Button } from "shards-react";

class NetCaloriesChart extends Component {
    state = {
        net_calorie_show: 'monthly'
    }


    // setGradientColor = (canvas, color) => {
    //     const ctx = canvas.getContext('2d')
    //     const gradient = ctx.createLinearGradient(0, 0, 600, 550);
    //     gradient.addColorStop(0, color);
    //     gradient.addColorStop(0.95, "rgba (133, 122, 144, 0.5)");
    //     return gradient
    // }
    
    // getChartData = canvas => {
    //     const data = this.state.data
    //     if (data.datasets) {
    //         let colors = ["rgba (255, 0, 255, 0.75)", "rgba (0, 255, 0, 0.75)" ]
    //         data.datasets.forEach((set, i) => {
    //             set.backgroundColor = this.setGradientColor(canvas, colors[i]);
    //             set.borderColor = "white";
    //             set.borderWidtth = 2;
    //         })

    //     }
    //     return data
    // }

    render() { 
        let lineDataSets = this.props.userNetCalories && 
        [
            {
                label: "Monthly Net Calories",
                backgroundColor: "rgba(0,128,0, 0.8)",
                data: this.props.userNetCalories.monthly
            }
        ]

        return ( 
            <div>  
                <div style={{position: "absolute", top: '90px', left: '500px', width: 500, height: 550}}>
                    
                    { this.props.userNetCalories &&
                    <Line
                        options={{
                                responsive: true
                            }}
                        data={{
                            labels: [1],
                            datasets: lineDataSets
                        }}
                    />}
                </div>
                
                <ButtonGroup vertical style={{position: "absolute", top:'40px', left: '1100px', margin: '3em'}} className="profileButtonGroup">
                    <Button onClick={console.log(this.props.userNetCalories)} className="btn btn-primary" > Net Daily</Button>
                    <Button className="btn btn-primary" > Net Monthly</Button>
                    <Button className="btn btn-primary" > Net Yearly</Button>                
                </ButtonGroup>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return { userNetCalories: state.user.userInfo.net_calories, user: state.user.userInfo}
}

export default connect(mapStateToProps)(NetCaloriesChart)