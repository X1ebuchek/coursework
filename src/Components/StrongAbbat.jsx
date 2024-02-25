import React, {useEffect, useState} from 'react';
import MyTable from "./MyTable";
import {useNavigate} from "react-router-dom";
import authAPI from "../API";

const StrongAbbat = () => {
    const navigate = useNavigate();
    const [selectedTool, setSelectedTool] = useState({
        "id" : 1,
        "description": "",
        "status": "NEW"
    });


    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState([]);
    const [tools, setTools] = useState([]);
    const [SwitchMode, setSwitchMode] = useState(false);

    const [object, setObject] = useState({
        "instrument": {
            "id": 0,
            "description": null,
            "status": null
        },
        "humanDTOS": []
    })


    const handleAddToSacrifice = () => {
        // Логика для кнопки "Принести в жертву"
        console.log("Отправка запроса с данными выбранных строк:", selectedRows);
        console.log(object);
        authAPI.sacrifice(object, localStorage.getItem("userToken")).then(r => {
            if (r.status === 200) {
                setData(r.data);
                setSelectedRows([]);
            }
            authAPI.get_instr(localStorage.getItem("userToken")).then(r => {
                if (r.status === 200) {
                    setTools(r.data);
                }
            }).catch(err => {
                alert(err.response.data)
                console.log(err.data);
            });
        }).catch(err => {
            alert(err.response.data)
            console.log(err.data);
        });

        setTimeout(() =>{

        },1000);
    };

    const handleMakeMember = () => {
        // Логика для кнопки "Сделать членом аббатства"
        console.log("Отправка запроса с данными выбранных строк:", selectedRows);

        authAPI.make_members(selectedRows, localStorage.getItem("userToken")).then(r => {
            if (r.status === 200) {
                setData(r.data);
                setSelectedRows([]);
            }
        }).catch(err => {
            alert(err.response.data)
            console.log(err.data);
        });
    };

    const handleCheckboxChange = (rowItem) => {
        const isSelected = selectedRows.includes(rowItem);
        // Если rowItem уже выбран, удаляем его из списка выбранных строк, иначе добавляем
        if (isSelected) {
            setSelectedRows(selectedRows.filter(item => item !== rowItem));
        } else {
            setSelectedRows([...selectedRows, rowItem]);
        }
    };

    const switchModeToAbbat = () => {
        authAPI.all_members(localStorage.getItem("userToken")).then(r => {
            if (r.status === 200) {
                setData(r.data);
            }
        }).catch(err => {
            alert(err.response.data)
            console.log(err.data);
        });

        setSwitchMode(true);
    };

    const switchModeToUser = () => {
        authAPI.get_humans(localStorage.getItem("userToken")).then(r => {
            if (r.status === 200) {
                setData(r.data);
            }
        }).catch(err => {
            alert(err.response.data)
            console.log(err.data);
        });

        authAPI.get_instr(localStorage.getItem("userToken")).then(r => {
            if (r.status === 200) {
                setTools(r.data);
            }
        }).catch(err => {
            alert(err.response.data)
            console.log(err.data);
        });
        setSwitchMode(false);
    };

    const exit = () => {
        localStorage.clear();
        navigate("/login");
    };


    useEffect(() => {
        authAPI.get_humans(localStorage.getItem("userToken")).then(r => {
            if (r.status === 200) {
                setData(r.data);
            }
        }).catch(err => {
            alert(err.response.data)
            console.log(err.data);
        });

        authAPI.get_instr(localStorage.getItem("userToken")).then(r => {
            if (r.status === 200) {
                setTools(r.data);
            }
            setSelectedTool(r.data[0])
        }).catch(err => {
            alert(err.response.data)
            console.log(err.data);
        });


        console.log(selectedTool)
    },[]);

    const handleToolChange = (event) => {
        const selectedToolId = event.target.value;
        const tool = tools.find(tool => tool.id.toString() === selectedToolId);
        setSelectedTool(tool);
        setObject({instrument: {id: tool.id, description: tool.description, status: tool.status}, humanDTOS: selectedRows})
    };

    useEffect(() => {
        console.log(selectedRows);
        setObject({...object, humanDTOS: selectedRows})
    }, [selectedRows]);

    useEffect(() => {
        console.log(selectedTool);
        setObject({...object, instrument: selectedTool})
    }, [selectedTool]);

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={exit} className="exit-button">Выход</button>
                <div className="left-menu">
                    {!SwitchMode && (
                        <h3>Выберите инструмент</h3>
                    )}
                    {!SwitchMode && (
                    <select onChange={handleToolChange} value={selectedTool.id}>
                        {/*<option></option>*/}
                        {tools.map(tool => (
                            <option key={tool.id} value={tool.id}>{tool.description}</option>
                        ))}
                    </select>
                    )}
                    {!SwitchMode && (
                        <div style={{marginTop: '200px'}}>
                            <button style={{width: "100%"}} onClick={handleAddToSacrifice}>Принести в жертву</button>
                        </div>
                    )}
                    {!SwitchMode && (
                        <div style={{marginTop: '20px'}}>
                            <button style={{width: "100%"}} onClick={handleMakeMember}>Сделать членом аббатства</button>
                        </div>
                    )}
                    {!SwitchMode && (
                        <div style={{marginTop: '20px'}}>
                            <button style={{width: "100%"}} onClick={switchModeToAbbat}>Показать членов аббатства</button>
                        </div>
                    )}
                    {SwitchMode && (
                        <div style={{marginTop: '20px'}}>
                            <button style={{width: "100%"}} onClick={switchModeToUser}>Показать обычных людей</button>
                        </div>
                    )}
                </div>
                <div className="center" style={{marginTop: '75px', marginLeft: '250px', width: '60%'}}>
                    <MyTable data={data} selectedRows={selectedRows} onCheckboxChange={handleCheckboxChange}
                             outsider={false} elected={false}/>
                </div>
            </header>
        </div>
    );

};

export default StrongAbbat;
