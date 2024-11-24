import React, {useEffect, useRef, useState} from 'react';
import './CarForm.css';
import {useNavigate} from 'react-router-dom';
import DynamicBarChart from "./BarChart";
import DataTable from "./Table";
import Tabs from "./Tabs";

const Dashboard = (props) => {
    const navigete = useNavigate();
    const [loading, setLoading] = useState(true)
    const [processed, setProcessed] = useState(false);
    const [step, setStep] = useState(0);
    const handelBunnonClick = () => {
        navigete('/Download');
    }
    const prompt = useRef(null);
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

    const processDataset = async () => {
        const data = await fetch(API_ROOT + "/query/process?prompt=" + prompt.current.value, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })

        return await data.json()
    }

    useEffect(() => {
        if (processed) {
            //
        }
        else{
            prepareDataset().then((res) => {
                fetchDataset().then((res) => {
                    datasetData.current = res
                    console.log(res)
                    setLoading(false)
                }).catch();
            }).catch()
        }
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
                {   loading ? <div></div> :
                    <Tabs data={datasetData.current}/>
                }
            </div>

            <div className="content-input">
                <textarea ref={prompt} placeholder="Text"></textarea>
                <button onClick={() => {
                    processDataset().then((res) => {
                        datasetData.current = res
                        setProcessed(true)
                        setStep(step + 1)
                    })
                }} className="search-button">Send</button>
            </div>
        </div>
    );
};

export default Dashboard;
