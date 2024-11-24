import React, { useState } from "react";
import "./Download.css";

const Download = () => {
  const [datasets, setDatasets] = useState([]);
  const [newDatasetName, setNewDatasetName] = useState("");
  const [selectedDataset, setSelectedDataset] = useState(null);

  const addDataset = () => {
    if (newDatasetName.trim() === "") return; 

    const newDataset = {
      id: datasets.length + 1,
      name: newDatasetName.trim(),
    };

    setDatasets([...datasets, newDataset]); 
    setNewDatasetName(""); 
  };

  return (
    <div className="App">
      <h1>Dataset Management</h1>

  
      <div className="add-dataset">
        <input
          type="text"
          placeholder="Enter dataset name"
          value={newDatasetName}
          onChange={(e) => setNewDatasetName(e.target.value)}
        />
        <button onClick={addDataset}>Add Dataset</button>
      </div>
      <div className="dataset-list">
        <h2>Available Datasets:</h2>
        {datasets.length > 0 ? (
          datasets.map((dataset) => (
            <button
              key={dataset.id}
              onClick={() => setSelectedDataset(dataset)}
              className={selectedDataset?.id === dataset.id ? "selected" : ""}
            >
              {dataset.name}
            </button>
          ))
        ) : (
          <p>No datasets available. Add a new one above.</p>
        )}
      </div>

      
      {selectedDataset && (
        <div className="selected-dataset">
          <h2>Selected Dataset:</h2>
          <p>{selectedDataset.name}</p>
        </div>
      )}
    </div>
  );
};

export default Download;
