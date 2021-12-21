import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context';
import '../styles/MoneyDividerHat.css';

function Header({state}) {
  const {isLogin} = useContext(Context);
  const {login} = useContext(Context);
  return (
    <header>
        <div className='wrapper_for_header'>
          <span className='MoneyDividerHat'>
              <Link to='/' className='fake_label'>
                  <div className='label'>MoneyDivider</div> 
              </Link>
              <div className='fake_menu'>
                  <ul id="navbar">
                      <li><a href="#">Меню</a>
                          <ul>
                              {isLogin ? null :<Link to='/auth'>войти</Link>}
                              <Link to='/create_group'>новая группа</Link>
                              <Link to={'/profile/' + login}>профиль</Link>
                              {isLogin ? <Link to='/logout'>выйти</Link> : null}
                          </ul>
                      </li>
                  </ul>
              </div>
          </span>
        </div>
    </header>
  );
}

export default Header;