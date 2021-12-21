import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context';
import { useParams } from 'react-router-dom';
import Expense from '../Expense';
import Payment from '../Payment';
import "../../styles/button.css";
import "../../styles/GroupPage.css"
import "../../styles/Expense.css"
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function GroupPage({participants, expenses, groupInfo}) {
    const {baseURL} = useContext(Context);
    const params = useParams();
    const {group_id} = params;
    const {setGroupParticipants} = useContext(Context);
    const {setGroupInfo} = useContext(Context);
    const {setGroupExpenses} = useContext(Context);
    const [showParticipants, setShowParticipants] = React.useState(false);
    const [showExpenses, setShowExpenses] = React.useState(true);
    const [showAddParticipants, setShowAddParticipants] = React.useState(false);
    const changeParticipants = () => {
        setShowParticipants(!showParticipants);
    };
    const addParticipant = () => {
        setShowAddParticipants(!showAddParticipants);
    };
    const changeExpenses = () => {
        setShowExpenses(!showExpenses);
    };
    useEffect( (my_group_id = group_id) => {
            axios( {
                method: "GET",
                url: baseURL + 'group/' + my_group_id + '/participants',
            }).then(response => {
                const data = response.data;
                data.map(elem => {elem['id'] = elem['user_id']});
                setGroupParticipants(data)
            })
        }, [])
    useEffect( (my_group_id = group_id) => {
        axios( {
            method: "GET",
            url: baseURL + 'group/' + my_group_id + '/get',
        }).then(response => {
            const data = response.data;
            data['id'] = data['group_id'];
            setGroupInfo(data);
        })
    }, {})
    useEffect( (my_group_id = group_id) => {
        axios( {
            method: "GET",
            url: baseURL + 'group/' + my_group_id + '/get_expenses/full',
        }).then(response => {
            const data = response.data;
            data.map(elem => {
                elem['id'] = elem['expense_id'];
                elem['debtors'].map(elems => {elems['debt'] = (elem.count / (elem.debtors.length + 1)).toFixed(2)} )
                elem['debt'] = (elem.count / (elem.debtors.length + 1)).toFixed(2)
            });
                    console.log(data)
            setGroupExpenses(data)
        })
    }, [])
    const {isLogin} = useContext(Context);
    if (!isLogin) {
        return(
            <Redirect to='/auth'/>
        );
    }
    return (
        <div className='group_page_padding'>
            <div>
                <h1 className='group_title'>
                    <label>{groupInfo.group_name}</label>
                </h1>
                <p className = 'group_big_field'>
                    <label>Описание </label> 
                </p>
                <div>
                        <label className='group_description'>{groupInfo.description}</label>
                    </div>
            </div>

            <div>
                <p className = 'group_big_field' onClick = {changeParticipants}>Участники</p> 
                <div onClick={addParticipant}>добавить участника</div>
                {showAddParticipants?
                <form onSubmit= {e =>  {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const data = Object.fromEntries(formData);
                    addParticipant();
                    setTimeout(() => {
                        window.location.reload()
                    }, 500);
                }}>
                    <label>логин</label>
                    <input name='login'></input>
                    <button className='button_item'>добавить</button>
                </form>
                :null}
            </div>
            { showParticipants ? 
            <div className='gf_list'>
                {participants.map(elem => <Link to={'/profile/' + elem.login} className='items'><div className="exp_part_items"><p>{elem.name + ' ' + elem.surname}</p></div></Link>)}
            </div> : null }
            <div>
                <p className = 'group_big_field' onClick = {changeExpenses}>Долги</p> 
                <Link to='/create_expense' className="button_item">добавить долг</Link> 
                <Link to={'/payment/group/' + group_id} className="button_item">расчитаться</Link> 
            </div>
            { showExpenses ? 
            <div className='gf_list'>
                {expenses.map(elem => {
                    if (elem.type == 'EXP') {
                        return (
                            <Expense expense = {elem}/>
                        );
                    } else {
                        return (
                            <Payment payment = {elem}/>        
                        );
                    }

                })}
            </div> : null }

        </div>
  );
}

export default GroupPage;
