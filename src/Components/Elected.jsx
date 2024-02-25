import React, {useEffect, useState} from 'react';
import MyTable from "./MyTable";
import {useNavigate} from "react-router-dom";
import authAPI from "../API";

const StrongAbbat = () => {
    const navigate = useNavigate();
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [runes, setRunes] = useState(0);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupText, setPopupText] = useState("Абилка использована")


    const useAbility = () => {
        console.log("Отправка запроса с данными выбранных строк:", selectedRows);
        setPopupVisible(true);
        setTimeout(() => {
            setPopupVisible(false);
        }, 5000);
    };

    const buyAbility = () => {
        console.log("Отправка запроса с данными выбранных строк:", selectedRows);
        authAPI.buy_ability(selectedRows, localStorage.getItem("userToken")).then(r => {
            if (r.status === 200) {
                setAbilities(r.data);
                setSelectedRows([]);
            }
        }).catch(err => {
            alert(err.response.data)
            console.log(err.data);
        });


    };

    const handleCheckboxChange = (rowItem) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(rowItem)) {
                return prevSelectedRows.filter(item => item !== rowItem);
            } else {
                return [...prevSelectedRows, rowItem];
            }
        });
    };

    const exit = () => {
        localStorage.clear();
        navigate("/login");
    };


    useEffect(() => {
        authAPI.elected_ability(localStorage.getItem("userToken"))
            .then(r => {
                if (r.status === 200) {
                    setAbilities(r.data)
                }
            })
            .catch(err => {
                alert(err.response.data);
                console.log(err.data);
            });

    },[]);

    useEffect(() =>{
        authAPI.all_ability(localStorage.getItem("userToken"))
            .then(res => {
                if (res.status === 200) {
                    const newData = res.data.filter(item => !abilities.some(ability => ability.id === item.id));
                    setData(newData);
                }
            })
            .catch(err => {
                alert(err.response.data);
                console.log(err.data);
            });

        authAPI.rune_count(localStorage.getItem("userToken")).then(r => {
            if (r.status === 200) {
                setRunes(r.data)
            }
        }).catch(err => {
            alert(err.response.data)
            console.log(err.data);
        });
    },[abilities])



    return (
        <div className="App">
            <header className="App-header">
                {popupVisible && (
                    <div className="popup3">{popupText}</div>
                )}
                <button onClick={exit} className="exit-button">Выход</button>
                <div className="left-menu">
                    <h3>Выберите абилку</h3>
                    <select>
                        {abilities.map(ability => (
                            <option key={ability.id}>{ability.description}</option>
                        ))}
                    </select>
                    <div style={{marginTop: '200px'}}>
                        <button style={{width: "100%"}} onClick={useAbility}>Использовать абилку</button>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <button style={{width: "100%"}} onClick={buyAbility}>Купить абилки</button>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <h3>Количество рун:</h3>
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <h3>{runes}</h3>
                    </div>
                </div>
                <div className="center" style={{marginTop: '75px', marginLeft: '250px', width: '60%'}}>
                    <MyTable data={data} selectedRows={selectedRows} onCheckboxChange={handleCheckboxChange}
                             outsider={false} elected={true}/>
                </div>
            </header>
        </div>
    );

};

export default StrongAbbat;
