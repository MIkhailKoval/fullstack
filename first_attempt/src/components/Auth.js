import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Context } from '../context';
import "../styles/Auth.css"

function Auth() {
    const history = useHistory();
    const {setLogin} = useContext(Context);
    const {isLogin} = useContext(Context);
    const {login} = useContext(Context);
    const [password, setPassword] = useState();

    const listener = async () => {
        history.push("/create_user");
    };
    const {baseURL} = useContext(Context);
    const {setIsLogin} = useContext(Context);
    const HandleSubmit = async () => {
        fetch(baseURL + 'token/', {
            method: "POST",
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                'username': login, 
                password
            })
        }).then(response => {
            if (response.status !== 200) {
                console.log('Unauthorized, retry later!');
            } else {
                const data = response.json();
                console.log(data);
                const setter = async (data) => {
                    window.localStorage.setItem("ACCESS", data.access);
                    window.localStorage.setItem("REFRESH", data.refresh);
                }; 
                setter(data);
                setIsLogin(true);
                history.push("/");
            }
        });
    };
    if (isLogin) {
        return(
            <Redirect to='/'/>
        );
    }
    return (
        <div className='auth_wrapper'>
            <div className='wrapper_for_wrapper'>
                <form className = 'form'>
                    <label className='login'>Логин</label>
                    <input className='login_field' name='login' onChange = {
                        e => setLogin(e.target.value)
                    }/>
                    
                    <label className='password'>Пароль</label>
                    <input className='password_field' type='password' name='password' onChange = {
                        e => setPassword(e.target.value)
                    }/>
                    
                    <div className='button_wrapper'>
                        <div className='sign_in' onClick = { (e) => {
                            e.preventDefault();
                            console.log(login);
                            window.localStorage.setItem('login', login)
                            console.log(window.localStorage.getItem('login'))
                            HandleSubmit();
                        }}>войти</div>
                        <div className='sign_up' onClick ={listener} >подать заявку</div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Auth;
