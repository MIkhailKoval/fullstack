import axios from 'axios';
import { Context } from '../../context';
import '../../styles/Profile.css';
import { useHistory } from "react-router";
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function Profile() {
  const {baseURL} = useContext(Context);
  const params = useParams();
  const {userLogin} = params;
  const history = useHistory();
  const [profileInfo, setProfileInfo] = useState({});
  const {login} = useContext(Context);
  const my_login = login;
  console.log(my_login, "!!!!!!!!!", userLogin)
  const AddFriend = (my_login, userLogin) => {
    console.log(my_login, userLogin);
  
    fetch(baseURL + 'add/friend', {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          'user_login': my_login,
          'friend_login': userLogin
        }
      )
    }).then(err => console.log(err));
  }; 
  useEffect( () => {
      axios( {
          method: "GET",
          url: baseURL + 'user/get/' + userLogin,
      }).then(response => {
          const data = response.data;
          data['id'] = data.user_id;
          setProfileInfo(data)
      })
  }, [])

  const {isLogin} = useContext(Context);
  if (!isLogin) {
      return(
          <Redirect to='/auth'/>
      );
  }
  return (
        <div className='shift_profile'>
            <div>
              <h1>{profileInfo.name + ' ' + profileInfo.surname}</h1>
              <p>{'почта: ' + profileInfo.email}</p>
              <p>{'логин: ' + profileInfo.login}</p>
            </div>
            {userLogin !== login?<form className = 'form' onSubmit= {e =>  {
                    e.preventDefault();

                    AddFriend(my_login, userLogin);
                    history.push("/")
                }} >
              <button className='button_item'> Добавить в друзья</button>
            </form> : null}
        </div>
  );
}

export default Profile;