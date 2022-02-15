import React, { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import styles from './Profile.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateProfileInfo } from '../../redux/thunk/profile-thunks';
import { Logout } from '../../components/logout';
import { logout } from '../../redux/thunk/logout-thunk';
import { Navigate } from 'react-router-dom';
import { Typography } from '@alfalab/core-components/typography';

export const Profile = () => {
  const profileName = useAppSelector((store) => store.profile.name);
  const profileEmail = useAppSelector((store) => store.profile.email);
  const profileAvatar = useAppSelector((store) => store.profile.avatar);
  const { isLoggedIn } = useAppSelector((state) => state.login);

  const dispatch = useAppDispatch();

  const [avatar, setAvatar] = useState(profileAvatar);
  const [name, setName] = useState(profileName);
  const [editName, setEditName] = useState(false);

  const editNameHandler = () => setEditName(true);
  const editAvatarHandler = () => setAvatar('');

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value.trim());

  const onSubmitName = () => {
    if ((name && name !== profileName) || (avatar && avatar !== profileAvatar)) {
      dispatch(updateProfileInfo({ name, avatar }));
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

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className={cn('container', styles.root)}>
      <Typography.Title className={cn('form-title')} tag="h1" view="small">
        It-incubator
      </Typography.Title>
      <Typography.Title className={cn('form-subtitle')} tag="h2" view="xsmall">
        Personal Information
      </Typography.Title>

      <div>
        <img
          src={profileAvatar ? profileAvatar : 'http://s1.iconbird.com/ico/2013/11/504/w128h1281385326502profle.png'}
          alt="avatar"
        />
        <button onClick={editAvatarHandler}>Change avatar</button>
      </div>
      <div>
        {editName ? (
          <input type={'text'} value={name} onChange={changeNameHandler} onFocus={selectAllHandler} autoFocus />
        ) : (
          <span> Nickname : {profileName}</span>
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
