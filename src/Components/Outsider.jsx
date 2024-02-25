import React, {useEffect, useState} from 'react';
import MyTable from "./MyTable";
import {useNavigate} from "react-router-dom";
import authAPI from "../API";

const Outsider = () => {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState([]);





    const handleAddElect = () => {
        // Логика для кнопки "Принести в жертву"
        console.log("Отправка запроса с данными выбранных строк:", selectedRows);
        authAPI.make_elected(selectedRows, localStorage.getItem("userToken")).then(r => {
            if (r.status === 200) {
                setData(r.data);
                setSelectedRows([]);
            }
        }).catch(err => {
            alert(err.response.data)
            console.log(err.data);
        });
    };

    const handleRemoveElect = () => {
        // Логика для кнопки "Сделать членом аббатства"
        console.log("Отправка запроса с данными выбранных строк:", selectedRows);
        authAPI.make_unelected(selectedRows, localStorage.getItem("userToken")).then(r => {
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

    useEffect(() => {
        console.log(selectedRows);
    }, [selectedRows]);


    const exit = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        if (localStorage.getItem("userToken")==="undefined" || localStorage.getItem("userToken")===null){
            navigate("/login");
        }else {
            authAPI.get_electedHumans(localStorage.getItem("userToken")).then(r => {
                if (r.status === 200) {
                    setData(r.data);
                }
            }).catch(err => {
                alert(err.response.data)
                console.log(err.data);
            });
        }
    },[]);

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={exit} className="exit-button">Выход</button>
                <div className="left-menu">
                    <div style={{ marginTop: '200px'}}>
                        <button style={{width: "100%"}} onClick={handleAddElect}>Выдать метку</button>
                    </div>
                    <div style={{ marginTop: '20px'}}>
                        <button style={{width: "100%"}} onClick={handleRemoveElect}>Забрать метку</button>
                    </div>
                </div>
                <div className="center" style={{ marginTop: '75px', marginLeft: '250px', width: '60%' }}>
                    <MyTable data={data} selectedRows={selectedRows} onCheckboxChange={handleCheckboxChange} outsider={true} />
                </div>
            </header>
        </div>
    );

};

export default Outsider;
