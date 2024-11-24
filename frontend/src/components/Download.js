import React, {useRef, useState} from "react";
import "./Download.css";
import {useNavigate} from "react-router-dom";

const Download = (props) => {
    const [datasets, setDatasets] = useState([]);
    const [newDatasetName, setNewDatasetName] = useState("");
    const [selectedDataset, setSelectedDataset] = useState(null);
    const datasetId = useRef("");
    const navigate = useNavigate();

    const API_ROOT = "http://localhost:8000/api/dataset"

    const fetchDatasets = async (query) => {

        const response = await fetch(API_ROOT + "/list?query=" + query, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })

        return response.json()
    }

    const addDataset = () => {
        if (newDatasetName.trim() === "") return;

        const newDataset = {
            id: datasets.length + 1,
            name: newDatasetName.trim(),
        };

        fetchDatasets(newDataset.name).then((res) => {
            setDatasets(res.data);
        }).catch(console.error)

        setDatasets([...datasets, newDataset]);
    };

    const selectDataset = () => {
        navigate('/car-form-function')
    }

    return (
        <div className="App">
            <h1>Explore Opens Source Data</h1>

            <div className="add-dataset">
                <input
                    type="text"
                    placeholder="Enter keywords"
                    value={newDatasetName}
                    onChange={(e) => setNewDatasetName(e.target.value)}
                />
                <button onClick={addDataset}>Search</button>
            </div>
            <div className="dataset-list">
                <h2>Available Datasets:</h2>
                <div style={{
                    overflow: "none",
                    maxHeight: "60vh"
                }}>
                    {datasets.length > 0 ? (
                        datasets.map((dataset) => (
                            <button
                                key={dataset.id}
                                onClick={() => {
                                    datasetId.current = dataset.ID
                                    setSelectedDataset(dataset)
                                    props.keyCallback(datasetId.current[0])
                                }}
                                className={selectedDataset?.id === dataset.id ? "selected" : ""}
                            >
                                {dataset.display_title}
                            </button>
                        ))
                    ) : (
                        <p>Start entering keywords and phrases to display results</p>
                    )}
                </div>
            </div>


            {selectedDataset && (
                <div className="selected-dataset">
                    <h2>Selected Dataset:</h2>
                    <p>{selectedDataset.display_title}</p>
                    <button
                        onClick = {() => selectDataset()}
                        className="selected">
                        Select
                    </button>
                </div>
            )}
        </div>
    );
};

export default Download;
