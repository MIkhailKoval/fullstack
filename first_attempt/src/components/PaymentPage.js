import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Context } from '../context';


function PaymentPage({groupInfo}) {
    const {isLogin} = useContext(Context);
    const {baseURL} = useContext(Context);
    const history = useHistory();
    const {login} = useContext(Context);
    if (!isLogin) {
        return(
            <Redirect to='/auth'/>
        );
    }
    const group_id = groupInfo['group_id'];
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
                <div className='text'>Оплатить</div>
                <form className = 'form' onSubmit= {e =>  {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData);
                    console.log(data['login']);
                    data['participants_logins'] = data['login'];
                    delete data['login'];
                    data['group_id'] = group_id;
                    data['author_login'] = login;
                    data['devide_equally'] = false;
                    data['type'] = 'payment'; 
                    Submit(data);
                    history.push("/group/" + group_id);
                }} >
                    <div className='inner_wrapper'>
                        <label className='inner_text'>Логин</label>
                        <input className='inner_field' name='login'></input>
                    </div>
                    <div className='inner_wrapper'>
                        <label className='inner_text'>Сумма</label> 
                        <input className='inner_field' name='count'/>
                    </div>
                    <div className='create_group_button'>
                        <button className='create_group_button_inner'>рассчитаться</button>
                    </div>
            </form>
            </div>
        </div>
    );
}

export default PaymentPage;