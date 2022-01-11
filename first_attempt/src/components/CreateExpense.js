import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import "../styles/Block.css"
import {Context} from "../context";
import Item from './Item';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function CreateExpense({groupInfo}) {
    const {baseURL} = useContext(Context);
    let history = useHistory();
    const group_id = groupInfo['group_id'];
    const {login} = useContext(Context); 
    const {isLogin} = useContext(Context);
    if (!isLogin) {
        return(
            <Redirect to='/auth'/>
        );
    }
    const Submit = (data) => {
        fetch(baseURL + 'expense/create', {
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
                <div className='text'>Новый долг</div>
                <form className = 'form' onSubmit= {e =>  {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData);
                    const part = data['participants_not_prepared'].split(' ')
                                                            .join('').split(',');
                    delete data['participants_not_prepared'];
                    data['participants_logins'] = part;
                    data['group_id'] = group_id;
                    data['author_login'] = login;
                    data['devide_equally'] = false;
                    data['type'] = false; 
                    Submit(data);
                    history.push("/group/" + group_id);
                }} >
                    <div className='inner_wrapper'>
                        <label className='inner_text'>Название</label>
                        <input className='inner_field' name='description'></input>
                    </div>
                    <div className='inner_wrapper'>
                        <label className='inner_text'>Участники:</label>
                        <textarea className='inner_field' name='participants_not_prepared'></textarea>            
                    </div>
                    <div className='inner_wrapper'>
                        <label className='inner_text'>Стоимость</label>
                        <input className='inner_field' name='count'/>           
                    </div>
                    <div className="devide_equally">
                        <label><input type="checkbox" unchecked/>разделить поровну между всеми участниками</label>
                    </div>
                    <div className='create_group_button'>
                            <button className='create_group_button_inner'>Создать</button>
                    </div>
            </form>
            </div>
        </div>
    );
}

export default CreateExpense;