import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context';
import "../../styles/Block.css"
import Item from '../Item';

function Groups({state}) {
    const {baseURL} = useContext(Context);
    const {setGroupsState} = useContext(Context);
    const {login} = useContext(Context);
    const [showAddFriend, setShowAddFriend] = React.useState(false);
    useEffect( () => {
        axios( {
            method: "GET",
            url: baseURL + 'user/' + login + '/get_groups',
        }).then(response => {
            const new_data = []
            const data = response.data;
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                const elem = {};
                elem.id = data[i].group_id;
                elem.group_id = data[i].group_id;
                elem.group_name = data[i].group_name;
                elem.description = data[i].description;
                elem.name = data[i].group_name;
                elem.title = data[i].group_name;
                new_data.push(elem)
                // console.log(elem)
            } 
            setGroupsState(new_data)
        })
    }, [])
    return (
        <div className='gf_wrapper'>
            <div className='title'>Группы</div>
            <div className='gf_list'>
                {state.map(elem => <Link to={'/group/' + elem.id} className="items">
                                        <Item elem={elem} type ={'groups'}/>
                                   </Link>)}
                <div className='group_friend_button'><Link to='/create_group' className="button_item">создать группу</Link></div> 
            </div>
            <div className='arrows'>
            </div>
        </div>
    );
}
// <div className='left_arrow' onClick = {() => moveLeft(groupsNamesFromDb, state, shownElements, 'setGroupsState')}>{'<-'}</div>
// <div className='right_arrow' onClick = {() => moveRight(groupsNamesFromDb, state, shownElements, 'setGroupsState')}>{'->'}</div>

export default Groups;