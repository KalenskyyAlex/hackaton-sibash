import React, { useState } from "react";
import Papa from "papaparse";
import {useNavigate} from "react-router-dom";
import DataTable from "./Table";

const CSVUploadPage = () => {
    const [data, setData] = useState([]);
    const [file, setFile] = useState("");
    const [error, setError] = useState("");
    const [fileData, setFileData] = useState(undefined);
    const navigete = useNavigate();
    const handelBunnonClick = () => {
        navigete('/');
    }
    const handleDrop = (event) => {
        event.preventDefault();
        setError(""); // Clear any previous errors

        const file = event.dataTransfer.files[0];
        setFileData(file);
        setTimeout(() => setFile(event.dataTransfer.files[0].name), 1000)
        if (file && file.type === "text/csv") {
            parseCSV(file);
        } else {
            setError("Please upload a valid CSV file.");
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const parseCSV = (file) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                setData(results.data);
                console.log(results.data);
            },
            error: (err) => {
                setError("Failed to parse the CSV file.");
                console.error(err);
            },
        });
    };

    return (
        <div style={styles.page}>
            <button style={{position: "relative", left: '-44vw', marginBottom: '10px'}} className="upload-button" onClick={handelBunnonClick}>Back</button>
            <div
                style={styles.dropzone}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <p>Drag and drop a CSV file here, or click to upload.</p>
            </div>
            <div>
                Selected File: {file}
            </div>
            <br/>
            <button className="upload-button" onClick={async () => {
                const formData = new FormData();
                formData.append("file", file);

                await fetch("http://localhost:8000/api/dataset/upload", {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    }
                })

                handelBunnonClick()
            }}>Use uploaded File</button>

            {file === "" ?
                null :
                <div>
                    <h3 style={{textAlign: "left", margin: "20px"}}>Preview</h3>
                    <DataTable data={
                        {'data': data}
                    }/>
                </div>
            }
        </div>
    );
};

const styles = {
    page: {
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
    },
    dropzone: {
        border: "2px dashed #ccc",
        padding: "20px",
        borderRadius: "10px",
        cursor: "pointer",
        marginBottom: "20px",
        backgroundColor: "#f9f9f9",
    },
    error: {
        color: "red",
        fontWeight: "bold",
    },
    tableContainer: {
        marginTop: "20px",
        overflowX: "auto",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    tableHeader: {
        backgroundColor: "#f2f2f2",
    },
    tableCell: {
        border: "1px solid #ddd",
        padding: "8px",
        textAlign: "left",
    },
};

export default CSVUploadPage;
