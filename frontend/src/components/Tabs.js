import React, { useState } from 'react';
import DataTable from "./Table";
import DynamicBarChart from "./BarChart";

const Tabs = (props) => {
    // State to track the selected tab
    const [activeTab, setActiveTab] = useState(0);

    // List of tab names
    const tabNames = ["Table Format", "Data Visualisation"];
    const tabContent = [
        <DataTable data={props.data} />,
        <DynamicBarChart data={props.data}/>
    ];

    return (
        <div>
            <div className="tabs">
                {tabNames.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)} // Set the active tab on click
                        className={activeTab === index ? 'active' : ''}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                {tabContent[activeTab]} {/* Render content based on active tab */}
            </div>

            <style jsx>{`
                .tabs {
                    display: flex;
                    margin-bottom: 10px;
                }
                .tabs button {
                    border-radius: 8px;
                    padding: 10px 20px;
                    cursor: pointer;
                    border: 1px solid #ccc;
                    background-color: #ffd6d6;
                    margin-right: 5px;
                    transition: background-color 0.3s ease;
                }
                .tabs button.active {
                    background-color: #e46868;
                    color: white;
                }
                .tabs button:hover {
                    background-color: black;
                    color: white;
                }
                .tab-content {
                    padding: 20px;
                    border-top: 1px solid #ccc;
                    background-color: #f1f1f1;
                }
            `}</style>
        </div>
    );
};

export default Tabs;
