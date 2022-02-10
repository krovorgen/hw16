import React, { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import styles from './Profile.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateProfileInfo } from '../../redux/thunk/profile-thunks';
import { Logout } from '../../components/logout';
import { logout } from '../../redux/thunk/logout-thunk';

export const Profile = () => {
  const profileName = useAppSelector((store) => store.profile.name);
  const profileEmail = useAppSelector((store) => store.profile.email);
  const profileAvatar = useAppSelector((store) => store.profile.avatar);
  /*    const isLoggedIn = useAppSelector<RootState, boolean>(store => store.login.isLoggedIn);*/ //todo change name from Login

  const dispatch = useAppDispatch();

  /*  const [avatar, setAvatar] = useState('');*/ //todo edit avatar
  const [name, setName] = useState(profileName);
  const [editName, setEditName] = useState(false);

  const editNameHandler = () => setEditName(true);

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value.trim());

  const onSubmitName = () => {
    if (name && name !== profileName) {
      dispatch(updateProfileInfo({ name }));
    }
    if (name.trim() === '') {
      setName(profileName);
    }
  };

  const onClickSaveHandler = () => {
    setEditName(false);
    onSubmitName();
  };

  const onClickLogOutHandler = () => dispatch(logout());

  const selectAllHandler = (e: ChangeEvent<HTMLInputElement>) => e.currentTarget.select();

  /*   if (!isLoggedIn) {
       return <Navigate to={'/login'}/>
     }*/ //todo navigation to login

  return (
    <div className={cn('container', styles.root)}>
      <div> Personal Information</div>
      <div>
        <img
          src={profileAvatar ? profileAvatar : 'http://s1.iconbird.com/ico/2013/11/504/w128h1281385326502profle.png'}
          alt="avatar"
        />
      </div>
      <div>
        {editName ? (
          <input type={'text'} value={name} onChange={changeNameHandler} onFocus={selectAllHandler} autoFocus />
        ) : (
          <span> Name : {profileName}</span>
        )}
      </div>
      <div>Email: {profileEmail}</div>
      <div>
        <button onClick={editNameHandler}>Edit</button>
        <button onClick={onClickSaveHandler}>Save</button>
        <button onClick={onClickLogOutHandler}>
          <Logout />
        </button>
      </div>
    </div>
  );
};
