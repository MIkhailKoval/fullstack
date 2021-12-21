import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import "../styles/Block.css"
import {Context} from "../context";
import Item from './Item';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function CreateUser() {
    const {baseURL} = useContext(Context);
    let history = useHistory();
    const Submit = (data) => {
        fetch(baseURL + 'user/create', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((err) => console.log(err))
    };
    return (
        <div className='create_group'>
            <div className='outer_wrapper'>
                <div className='text'>Новый пользователь</div>
                <form className = 'form' onSubmit= {e =>  {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData);
                    Submit(data);
                    history.push('/auth');
                }} >
                    <div className='inner_wrapper'>
                        <label className='inner_text'>Имя</label>
                        <input className='inner_field' name='name'></input>
                    </div>
                    <div className='inner_wrapper'>
                        <label className='inner_text'>Фамилия</label>
                        <input className='inner_field' name='surname'/>           
                    </div>
                    <div className='inner_wrapper'>
                        <label className='inner_text'>Логин</label>
                        <input className='inner_field' name='login'/>           
                    </div>
                    <div className='inner_wrapper'>
                        <label className='inner_text'>Почта</label>
                        <input className='inner_field' name='email'/>           
                    </div>
                    <div className='inner_wrapper'>
                        <label className='inner_text'>Дата рождения</label>
                        <input className='inner_field' name='birth_date'/>           
                    </div>
                    <p className='additional_text'> Подать заявку на создание профиля на сайте.</p> 
                    <p className='additional_text'> После одобрения вам придет ссылка с вашим паролем</p>
                    <div className='create_group_button'>
                            <button className='create_group_button_inner'>Создать</button>
                    </div>
            </form>
            </div>
        </div>
    );
}

export default CreateUser;