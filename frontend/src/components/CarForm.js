import React, {useEffect, useRef, useState} from 'react';
import './CarForm.css';
import {useNavigate} from 'react-router-dom';

const Dashboard = (props) => {
    const navigete = useNavigate();
    const handelBunnonClick = () => {
        navigete('/Download');
    }

    const API_ROOT = "http://localhost:8000/api"
    const datasetData = useRef(null)

    const prepareDataset = async () => {
        const response = await fetch(API_ROOT + "/dataset/get?provider=WB?key=" + props.datasetKey(), {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })

        return true
    }

    const fetchDataset = async () => {
        const data = await fetch(API_ROOT + "/query/raw", {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })

        return await data.json()
    }
    useEffect(() => {
        prepareDataset().then((res) => {
            fetchDataset().then((res) => {
                console.log(res);
            }).catch();
        }).catch();


    }, [])

    return (
        <div className="container">
            <div className="header">
                <button className="upload-button" onClick={handelBunnonClick}>Upload dataset</button>
                <select className="select">
                    <option>Predictive model</option>
                    <option>Model 1</option>
                    <option>Model 2</option>
                </select>
            </div>

            <div className="visualized-data">
                <h3>Visualized Data</h3>
                <div className="line-chart">
                    <p>Line chart (placeholder)</p>
                    <svg width="200" height="100">
                        <polyline
                            points="10,90 50,50 90,60 130,40 170,30"
                            style={{fill: 'none', stroke: 'black', strokeWidth: 2}}
                        />
                    </svg>
                </div>
                <div className="gauges">
                    <div>
                        <p>Suspense blandit</p>
                        <div className="gauge">50%</div>
                    </div>
                    <div>
                        <p>Regestas</p>
                        <div className="gauge">90%</div>
                    </div>
                </div>
            </div>

            <div className="content-input">
                <textarea placeholder="Text"></textarea>
                <button className="search-button">Send</button>
            </div>
        </div>
    );
};

export default Dashboard;
