import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/Block.css"
import {Context} from "../context";
import Item from './Item';


function Friends({state}) {
    const {baseURL} = useContext(Context);
    const {setFriendsState} = useContext(Context);
    const {login} = useContext(Context);
    console.log('my login - ', login )
    useEffect( () => {
        axios( {
            method: "GET",
            url: baseURL + 'friends/list/' + login
        }).then(response => {
            const new_data = [];
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                const elem = {};
                elem.id = data[i].friend_id;
                elem.friend_id = data[i].friend_id;
                elem.login = data[i].login;
                elem.name = data[i].name;
                elem.email = data[i].email;
                elem.surname = data[i].surname;
                elem.title = data[i].name;
                new_data.push(elem);
                // console.log(elem);
            } 
            setFriendsState(new_data);
        })
    }, [])
    // надо сделать такое же для групп + запилить странички профиля и группы
    return (
        <div className='gf_wrapper'>
            <div className='title'>Друзья</div>
            <div className='gf_list'>
                {state.map(elem => <Link to={'/profile/' + elem.login} className="items"><Item elem = {elem} type ={'friends'}/></Link>)}
                <div className='group_friend_button'><Link to='/add_friends' className="button_item">добавить друзей</Link></div> 
            </div>
            <div className='arrows'>
            </div>
        </div>
    );
}

export default Friends;

