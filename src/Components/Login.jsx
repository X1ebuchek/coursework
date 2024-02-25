import React, { useState } from "react";
import "../CSS/login.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import authAPI from "../API";
import {Navigate, useNavigate} from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupText, setPopupText] = useState("Неверный логин или пароль")

    const [user, setUser] = useState({
        id: "",
        name: "",
        status: "ALIVE",
        dateOfBirth: "1488-02-24",
        password: "",
        role: "HUMAN",
        token: "",
        rating: ""
    });


    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleInputChange = (event, type) => {
        let value;
        if (type === "dateOfBirth"){
            value = formatDate(event);
        }else value = event.target.value;
        console.log(type + " " + value);
        setUser({ ...user, [type]: value });
    };


    const formatDate = (date) => {
        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear();

        return yy + '-' + mm + '-' + dd;
    }
    const handleLogin = () => {
        const json = JSON.stringify(user);
        authAPI.login(json).then(r => {
            if (r.status === 200){
                console.log(r.data);
                localStorage.setItem("userLogin", r.data.name)
                localStorage.setItem("userToken", r.data.token)
                localStorage.setItem("signIn", "true")
                switch (r.data.role){
                    case "HUMAN": navigate("/user"); break;
                    case "ABBEY_MEMBER":
                        switch (r.data.rank){
                            case "RECRUIT": navigate("/abbat"); break;
                            case "GRAND": navigate("/abbat/strong"); break;
                        }
                        break;
                    case "OUTSIDER": navigate("/outsider"); break;
                }
            }
        }).catch(err => {
            setPopupText("Неверный логин или пароль")
            setPopupVisible(true);
            setTimeout(() => {
                setPopupVisible(false);
            }, 5000);
            //alert(err.response.data)
        });
    };

    const handleRegister = () => {

        const json = JSON.stringify(user);
        authAPI.register(json).then(r => {
            if (r.status === 200){
                localStorage.setItem("userLogin", r.data.name)
                localStorage.setItem("userToken", r.data.token)
                localStorage.setItem("signIn", "true")
                navigate("/user");
            }
        }).catch(err => {
            setPopupText("Такой пользователь уже существует")
            setPopupVisible(true);
            setTimeout(() => {
                setPopupVisible(false);
            }, 5000);
        });
    };

    const toggleRegisterForm = () => {
        setShowRegisterForm(!showRegisterForm);
        setUser({
            id: "",
            name: "",
            status: "ALIVE",
            dateOfBirth: "1488-02-24",
            password: "",
            role: "HUMAN",
            token: "",
            rating: ""
        });
    };

    if (localStorage.getItem("signIn") && localStorage.getItem("userToken")!=="undefined"){
        console.log(localStorage.getItem("userToken"))
        return <Navigate to={"/user"} replace={true}/>
    }

    return (
        <div className="App-header">
            {popupVisible && (
                <div className="popup2">{popupText}</div>
            )}
            <div className="wrapper">
                {!showRegisterForm && (
                    <div className="form-wrapper sign-in auth-form-background">
                        <form action="">
                            <h2>Логин</h2>
                            <div className="input-group">
                                <input
                                    id="login-form-login"
                                    type="text"
                                    required
                                    value={user.name}
                                    onChange={event => handleInputChange(event, "name")}
                                />
                                <label htmlFor="login-form-login" className="label-name">
                                    <span className="content-name">Имя пользователя</span>
                                </label>
                            </div>
                            <div className="input-group">
                                <input
                                    id="password-form-login"
                                    type="password"
                                    required
                                    value={user.password}
                                    onChange={event => handleInputChange(event, "password")}
                                />
                                <label htmlFor="password-form-login" className="label-name">
                                    <span className="content-name">Пароль</span>
                                </label>
                            </div>
                            <button type="button" id="login-button" onClick={handleLogin}>Войти</button>
                            <div className="signUp-link">
                                <p>Нет аккаунта? <span className="signUpBtn-link" onClick={toggleRegisterForm}><strong>Создать аккаунт</strong></span></p>
                            </div>
                        </form>
                    </div>
                )}
                {showRegisterForm && (
                    <div className="form-wrapper sign-up auth-form-background">
                        <form action="">
                            <h2>Регистрация</h2>
                            <div className="input-group">
                                <input type="text" id="register-form-login" required
                                       value={user.name}
                                       onChange={event => handleInputChange(event, "name")}
                                />
                                <label htmlFor="register-form-login" className="label-name">
                                    <span className="content-name">Имя пользователя</span>
                                </label>
                            </div>
                            <div className="input-group">
                                <DatePicker
                                    selected={user.dateOfBirth}
                                    onChange={event => handleInputChange(event, "dateOfBirth")}
                                    dateFormat="yyyy-MM-dd"
                                />
                                <label htmlFor="register-form-login" className="label-name1">
                                    <span className="content-name">Дата рождения</span>
                                </label>
                            </div>
                            <div className="input-group">
                                <input type="password" id="register-form-password" required
                                       value={user.password}
                                       onChange={event => handleInputChange(event, "password")}
                                />
                                <label htmlFor="register-form-password" className="label-name">
                                    <span className="content-name">Пароль</span>
                                </label>
                            </div>
                            <button type="button" id="register-button" onClick={handleRegister}>Зарегистрироваться</button>
                            <div className="signUp-link">
                                <p>Уже есть аккаунт? <span className="signInBtn-link" onClick={toggleRegisterForm}><strong>Войти</strong></span></p>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
