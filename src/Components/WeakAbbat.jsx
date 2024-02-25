import React, { useState, useRef, useEffect } from 'react';
import Flame from "./Flame";
import {useNavigate} from "react-router-dom";
import authAPI from "../API";

const WeakAbbat = () => {
    const navigate = useNavigate();
    const [altarBuilt, setAltarBuilt] = useState(false);
    const [buildInProgress, setBuildInProgress] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupVisible1, setPopupVisible1] = useState(false);
    const [createToolPopupVisible, setCreateToolPopupVisible] = useState(false);

    const [instr, setInstr] = useState({
        "id" : 1,
        "description": "",
        "status": "NEW"
    });

    const createToolRef = useRef(null); // Ссылка на всплывающее окно "Создать инструмент"

    useEffect(() => {
        // Добавляем обработчик событий для клика вне всплывающего окна "Создать инструмент"
        function handleClickOutside(event) {
            if (createToolRef.current && !createToolRef.current.contains(event.target) && createToolPopupVisible) {
                setCreateToolPopupVisible(false);
            }
        }
        // Добавляем обработчик только если всплывающее окно "Создать инструмент" отображается
        if (createToolPopupVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        // Очистка обработчика после размонтирования компонента
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [createToolPopupVisible]);

    const handleCreateToolClick = () => {
        setCreateToolPopupVisible(true);
    };

    const addInstr = () => {
        authAPI.add_instr(instr, localStorage.getItem("userToken")).then(r => {
            if (r.status === 200){
                setPopupVisible1(true);
                setTimeout(() => {
                    setPopupVisible1(false);
                }, 3000);
            }
        }).catch(err => {
            alert(err.response.data)
            console.log(err.data);
        });
        setInstr({ ...instr, desription: ""})
    }

    const exit = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <header className="App-header">
            <div className="header-content">
                {/*{!altarBuilt && !buildInProgress && (*/}
                {/*    <>*/}
                {/*        <button onClick={buildAltar}>Построить алтарь</button>*/}
                {/*    </>*/}
                {/*)}*/}
                {/*{altarBuilt && (*/}
                {/*    <div className="altar-container">*/}
                {/*        <div className="altar">*/}
                {/*            <div className="circle"></div>*/}
                {/*            <div className="pentagram"></div>*/}
                {/*            <Flame position="left-flame"/>*/}
                {/*            <Flame position="right-flame"/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
            {popupVisible && (
                <div className="popup">Алтарь успешно построен</div>
            )}
            {popupVisible1 && (
                <div className="popup">Инструмент успешно добавлен</div>
            )}
            {createToolPopupVisible && (
                <div ref={createToolRef} className="popup1">
                    <input
                        type="text"
                        placeholder="Введите название инструмента"
                        value={instr.description}
                        onChange={event => setInstr({...instr, description: event.target.value})}
                    />
                    <button onClick={addInstr}>Добавить</button>
                </div>
            )}
            <button onClick={handleCreateToolClick}>Создать инструмент</button>
            <button onClick={exit} className="exit-button">Выход</button>
            {/* Переместили кнопку выхода за пределы алтаря */}
        </header>
    );
};

export default WeakAbbat;
