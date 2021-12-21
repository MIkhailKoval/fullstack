import "../../styles/CreateGroup.css";
import { useHistory } from "react-router";
import { useContext } from "react";
import { Context } from "../../context";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function CreateGroup() {
    const {baseURL} = useContext(Context);
    let history = useHistory();
    const {isLogin} = useContext(Context);
    if (!isLogin) {
        return(
            <Redirect to='/auth'/>
        );
    }
    const Submit  = (data, part) => {
        fetch(baseURL + 'group/create/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(
            (data) => {
                const group_id = data['group_id'];
                part.forEach((elem) => {
                    if (part.length === 0) {
                        return;
                    }
                    fetch(baseURL + 'group/' + data['group_id'] + '/add/user', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            user_login: elem 
                        })
                    })
                })
            console.log(group_id)
            return group_id   
        }).then(value => {  
                setTimeout(() => {
                    window.location.reload()
                }, 4000);
                history.push('/group/' + value)
            });
        };
    return (
        <div className='create_group'>
            <div className='outer_wrapper'>
                <div className='text'>Новая группа</div>
                <form className = 'form' onSubmit= {e =>  {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData);
                    const part = data['participants_not_prepared'].split(' ')
                                                            .join('').split(',');
                    delete data['participants_not_prepared'];
                    Submit(data, part);
                }} >
                    <div className='inner_wrapper'>
                        <label className='inner_text'>Название</label>
                        <input className='inner_field' name='group_name'></input>
                    </div>
                    <div className='inner_wrapper'>
                        <label className='inner_text'>Описание</label> 
                        <textarea className='inner_field' name='description'></textarea>
                    </div>
                    <div className='inner_wrapper'>
                        <label className='inner_text'>Участники</label>
                        <textarea className='inner_field' name='participants_not_prepared'></textarea>            
                    </div>
                    <div className='create_group_button'>
                        <button className='create_group_button_inner'>Создать</button>
                    </div>
            </form>
            </div>
        </div>
    );
}

export default CreateGroup;
