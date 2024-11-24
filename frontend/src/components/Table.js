import React, {useState, useEffect} from 'react';

function DataTable(props) {
    useEffect(() => {
        //     const fetchData = async () => {
        //         try {
        //             // const response = await axios.get("http://localhost:5000/sales");
        //             // Обробка даних у формат, потрібний для Recharts
        //             const formattedData = props.data
        //         } catch (error) {
        //             console.error("Помилка завантаження даних:", error);
        //         }
        //     };
        //
        //     fetchData().then();
    }, []);

    return (
        <div style={{maxWidth: 'calc(100%-60px)', overflowX: "auto", overflowy: "auto", maxHeight: "60vh"}}>
            <h2>Users Data</h2>
            <table border="1">
                <thead>
                <tr>
                    {Object.keys(props.data['data'][0]).map(key => (<th>{key}</th>))}
                </tr>
                </thead>
                <tbody>
                {props.data['data'].map(row => {
                    return (<tr>
                        {Object.keys(props.data['data'][0]).map(key => (<th>{row[key]}</th>))}
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;