import React, {useEffect, useState} from 'react';
import Flame from "./Flame";
import {Navigate, useNavigate} from "react-router-dom";
import authAPI from "../API";

const User = () => {
    let isBuild = false;
    const navigate = useNavigate();
    const [altarBuilt, setAltarBuilt] = useState(false);
    const [buildInProgress, setBuildInProgress] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupVisible1, setPopupVisible1] = useState(false);
    const [popupText, setPopupText] = useState("Алтарь успешно построен")

    const [user, setUser] = useState({
        id: "",
        name: "",
        status: "ALIVE",
        dateOfBirth: "1488-02-24",
        password: "",
        role: "HUMAN",
        token: localStorage.getItem("userToken"),
        rating: ""
    });


    const buildAltar = () => {
        setPopupText("Алтарь успешно построен");
        setBuildInProgress(true);
        setTimeout(() => {
            setAltarBuilt(true);
            setTimeout(() => {
                setBuildInProgress(false);
                setPopupVisible(true);
                setTimeout(() => {
                    setPopupVisible(false);
                }, 5000);
            }, 5000);
        }, 500);

        const json = JSON.stringify(user);
        authAPI.altar(json).then(r => {
            const json = JSON.stringify(user);
            if (r.status === 200){
                console.log("Успешно!")
            }
        }).catch(err => {
            //alert(err.response.data)
            console.log(err.data);
        });
    };

    const exit = () => {
          localStorage.clear();
          navigate("/login");
    };

    const doKindThing = () => {
        authAPI.good_action(localStorage.getItem("userToken")).then(r => {
            if (r.status === 200){
                setPopupText(r.data)
                setPopupVisible(true);
                setTimeout(() => {
                    setPopupVisible(false);
                }, 5000);
            }
        }).catch(err => {
            //alert(err.response.data)
            console.log(err.data);
        });
    };
    const doEvilThing = () => {
        authAPI.bad_action(localStorage.getItem("userToken")).then(r => {
            if (r.status === 200){
                setPopupText(r.data)
                setPopupVisible1(true);
                setTimeout(() => {
                    setPopupVisible1(false);
                }, 5000);
            }
        }).catch(err => {
            //alert(err.response.data)
            console.log(err.data);
        });
    };
    useEffect(() => {
        if (localStorage.getItem("userToken")=="undefined" || localStorage.getItem("userToken")=='null'){
            localStorage.clear();
            navigate("/login");
        }else {
            const json = JSON.stringify(user);
            authAPI.login_by_token(json).then(r => {
                if (r.status === 200){
                    console.log(r.data);
                    localStorage.setItem("userLogin", r.data.name)
                    localStorage.setItem("userToken", r.data.token)
                    localStorage.setItem("signIn", "true")
                    switch (r.data.role){
                        case "ABBEY_MEMBER": navigate("/abbat"); break;
                        case "OUTSIDER": navigate("/outsider"); break;
                    }
                    if (r.data.isElected) navigate("/user/elected");
                }else navigate("/login");
            }).catch(err => {
                alert(err.response.data)
            });


            authAPI.get_altar(json).then(r => {
                console.log("fdfsdfsdf");
                if (r.status === 200){
                    setAltarBuilt(true);
                }
            }).catch(err => {
                //alert(err.response.data)
                console.log(err.data);
            });
        }
    },[]);


    //setAltarBuilt(true);
    return (
        <header className="App-header">
            <div className="header-content">
                {!altarBuilt && !buildInProgress && (
                    <button onClick={buildAltar}>Построить алтарь</button>
                )}
                {altarBuilt && (
                    <div className="altar-container">
                        <div className="altar">
                            <div className="circle"></div>
                            <div className="pentagram"></div>
                            <Flame position="left-flame"/>
                            <Flame position="right-flame"/>
                        </div>
                    </div>
                )}

            </div>
            {popupVisible && (
                <div className="popup">{popupText}</div>
            )}
            {popupVisible1 && (
                <div className="popup2">{popupText}</div>
            )}
            <div className="left-menu">
                <div style={{ marginTop: '150px'}}>
                    <button style={{width: "100%"}} onClick={doKindThing}>Сделать доброе дело</button>
                </div>
                <div style={{ marginTop: '20px'}}>
                    <button style={{width: "100%"}} onClick={doEvilThing}>Сделать злое дело</button>
                </div>
            </div>
            <button onClick={exit} className="exit-button">Выход</button>
            {/* Переместили кнопку выхода за пределы алтаря */}
        </header>
    );
};

export default User;