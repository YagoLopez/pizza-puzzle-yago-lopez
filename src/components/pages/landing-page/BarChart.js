import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export const LikesBarChart = (props) => {

    const marginStyle = {top: 20, right: 40, bottom: 20, left: 10};
    const legendStyle = {
        top: 220,
        right: 65,
        backgroundColor: '#f5f5f5',
        border: '1px solid #d5d5d5',
        borderRadius: 3,
        lineHeight: '30px'
    };
    const tooltipStyle ={ width: 150, backgroundColor: '#ccc' };
    const barStyle = {cursor: 'pointer'};

    return (
        <div>
            <div className='chart-title'>Click chart sectors for more information</div>
            <BarChart width={props.width} height={props.height} data={props.data} margin={marginStyle}>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey='username'/>
                <YAxis dataKey='likesCounter'/>
                <Tooltip wrapperStyle={tooltipStyle}/>
                <Legend width={100} wrapperStyle={legendStyle}/>
                <Bar dataKey='likesCounter'
                     fill='#8884d8'
                     onClick={props.onBarClick}
                     style={barStyle}
                     type='monotone'
                     barSize={30}/>
            </BarChart>
        </div>

    )
}



