import React from 'react';
import '../styles/Block.css'

function Item({elem, type}) {
  if (elem.hasOwnProperty('id')) {
    let ans = "";
    if (type === 'friends') {
      ans = elem.name + ' ' + elem.surname;
    } else if (type === 'groups') {
      ans = elem.title;
    } else if (type === 'balances') {
      ans = elem.name + ' ' + elem.count + ' руб.'
    }
    return (
        <p>{ans}</p>
    );
  }
  else {
    return (
        <p id= 'fake'>{'fake element'}</p> 
    );
  }
}

export default Item;