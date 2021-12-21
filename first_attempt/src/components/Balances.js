import React, { useContext } from 'react';
import "../styles/Block.css"
import {Context} from "../context";
import Item from './Item';

function Balances({state}) {
    const {balancesFromDb} = useContext(Context);
    return (
        <div className='gf_wrapper'>
            <div className='title'>Баланс</div>
            <div className='gf_list'>
                {state.map(elem => <Item elem = {elem} type ={'balances'}/>)}
            </div>
        </div>
    );
}

export default Balances;