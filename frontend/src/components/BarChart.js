import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import randomColor from 'randomcolor';

const DynamicBarChart = (props) => {
    return (
        <div>
            <h2>Dynamic Sales Data</h2>
            {
                Object.keys(props.data['data'][0]).length > 5 ?
                <h3>Too many columns. Use prompts to analyze data better</h3> : null
            }
            {
                Object.keys(props.data['data']).length > 5 ?
                    <h3>Too many rows. Use prompts to analyze data better</h3> : null
            }
            <BarChart
                width={600}
                height={400}
                data={props.data['data']}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                    Object.keys(props.data['data'][0]).map((key) => <Bar dataKey={key} fill={randomColor()}/>)
                }
                {/*<Bar dataKey="expected" fill="#8884d8" />*/}
                {/*<Bar dataKey="received" fill="#f884f8" />*/}
            </BarChart>
        </div>
    );
};

export default DynamicBarChart;