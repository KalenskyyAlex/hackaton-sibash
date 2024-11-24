import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CarForm from './components/CarForm';
import Download from './components/Download';
import DownloadFromPC from "./components/DownloadFromPC";


function App() {
    const [datasetKey, setDatasetKey] = useState("");

    const keyCallback = (newKey) => {
        setDatasetKey(newKey)
    }

    const getKeyCallback = () => {
        return datasetKey
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<CarForm datasetKey={getKeyCallback}/>}/>
                <Route path="/car-form-function" element={<CarForm datasetKey={getKeyCallback}/>}/>
                <Route path="/download" element={<Download keyCallback={keyCallback}/>}/>
                <Route path="/download-pc" element={<DownloadFromPC keyCallback={keyCallback}/>}/>
            </Routes>
        </Router>
    );
}

export default App;
