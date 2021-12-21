import React, {useState} from 'react';
import {Context} from "../context";
import Friends from "./Friends";
import Groups from "./Group/Groups";
import Header from "./Header";
import Balances from "./Balances";
import Auth from "./Auth";
import Profile from './Profile/Profile';
import CreateGroup from './Group/CreateGroup';
import CreateUser from './CreateUser';
import GroupPage from './Group/GroupPage';
import Logout from './Logout';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import "../styles/Content.css";
import "../styles/Block.css";
import CreateExpense from './CreateExpense';
import Payment from "./PaymentPage";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const baseURL = 'http://127.0.0.1:8000/api/';
  const [isLogin, setIsLogin] = React.useState(
    window.localStorage.getItem('ACCESS')
  );
  const [login, setLogin] = React.useState(window.localStorage.getItem('login'));
  const [groupsState, setGroupsState] = useState([]);
  const [friendsState, setFriendsState] = useState([]);
  const [balancesState, setBalancesState] = useState([]);
  // group page
  const [groupInfo, setGroupInfo] = useState([]);
  const [groupParticipants, setGroupParticipants] = useState([]);
  const [groupExpenses, setGroupExpenses] = useState([]);
  
  console.log(window.localStorage.getItem("ACCESS"));
  return (
    <Context.Provider value={{setFriendsState, setGroupsState,
                              setBalancesState, setGroupParticipants, setGroupExpenses, 
                              setGroupInfo, baseURL, setIsLogin, isLogin, setLogin, login}}>
      <>
        <Router>
          <Header isLogin = {isLogin} login = {login}/>
          <Switch>
            <Route path='/auth'>
                <Auth setIsLogin={setIsLogin} setLogin = {setLogin} login = {login} isLogin = {isLogin}/>
            </Route>
            <Route path='/logout'>
              <Logout setIsLogin = {setIsLogin}/>
            </Route>
            <Route path='/profile/:userLogin'>
                <Profile isLogin = {isLogin}
                          login = {login}/>
            </Route>           
            <Route path='/group/:group_id'>
                <GroupPage participants = {groupParticipants} 
                           expenses = {groupExpenses}
                           groupInfo = {groupInfo}
                           isLogin = {isLogin}
                           login = {login}/>
            </Route>    
            <Route path='/create_group'>
              <CreateGroup isLogin = {isLogin}
                           login = {login}/>
            </Route>
            <Route path='/create_expense'>
              <CreateExpense groupInfo={groupInfo}
                             isLogin = {isLogin}
                             login = {login}/>
            </Route>
            <Route path='/payment/group/:group_id'>
              <Payment groupInfo={groupInfo}
                       isLogin = {isLogin}
                       login = {login}/>
            </Route>
            <Route path='/create_user'>
            <CreateUser/>
            </Route>
            <Route path='/'>
                {isLogin ?
                <div className='main_wrapper'>
                  <div className = 'left_wrapper'>
                      <Friends state = {friendsState}
                               login = {login}/>
                  </div>
                  {/*<div className = 'center_wrapper'>
                      <Balances state = {balancesState}
                                login = {login}/>
                </div> */}
                  <div className = 'right_wrapper'>
                      <Groups state = {groupsState}
                              login = {login}/>
                  </div>
                </div> 
                    : <Redirect to='/auth'/>}
            </Route>
          </Switch>
        </Router>
      </>
    </Context.Provider>
  );
}

export default App;