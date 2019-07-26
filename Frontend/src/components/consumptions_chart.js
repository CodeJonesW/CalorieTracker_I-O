import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux'

class ConsumptionsChart extends Component {


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
        let barDataSets = this.props.userConsumptions && 
        [
            {
                label: "Calories Intaken",
                backgroundColor: "rgba(255, 0, 0, 0.8)",
                data: this.props.userConsumptions.map(consumption =>  consumption.calories_intaken)
            },
            // {
            //     label: "Activity Distance",
            //     backgroundColor: "rgba(0,128,0, 0.8)",
            //     data: this.props.userActivities.map(activity =>  parseFloat(activity.distance.split(' ')[0]))
            // }
        ]

        return ( 
            <div style={{position: "relative", width: 600, height: 550}}>
                { this.props.userConsumptions &&
                <Bar
                    options={{
                            responsive: true
                        }}
                    data={{
                        labels: this.props.userConsumptions.map(consumption => consumption.category),
                        datasets: barDataSets
                    }}
                />}
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return { userConsumptions: state.user.userInfo.consumptions, user: state.user.userInfo}
}

export default connect(mapStateToProps)(ConsumptionsChart)