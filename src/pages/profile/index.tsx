import React, { ChangeEvent, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';

import { Typography } from '@alfalab/core-components/typography';
import { Button } from '@alfalab/core-components/button';
import { Input } from '@alfalab/core-components/input';
import { RoutesEnum } from '@/helpers/routes';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateProfileInfo } from '@/redux/thunk/profile-thunks';
import { LogoutButton } from '@/components/LogoutButton';

import styles from './Profile.module.scss';

const Profile = () => {
  const profileName = useAppSelector((store) => store.profile.name);
  const profileEmail = useAppSelector((store) => store.profile.email);
  const profileAvatar = useAppSelector((store) => store.profile.avatar);
  const { isLoggedIn } = useAppSelector((state) => state.login);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [avatar, setAvatar] = useState(profileAvatar);
  const [name, setName] = useState(profileName);
  const [editName, setEditName] = useState(false);

  const editNameHandler = () => setEditName(true);
  const cancelEditName = () => {
    setEditName(false);
    setName(profileName);
  };
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

  if (!isLoggedIn) router.push(RoutesEnum.Login);

  return (
    <>
      <div className={cn('container', styles.root)}>
        <div className={cn(styles.wrap, 'form-wrap')}>
          <Typography.Title className={cn('form-title')} tag="h1" view="small">
            It-incubator
          </Typography.Title>
          <Typography.Title className={cn('form-subtitle')} tag="h2" view="xsmall">
            Personal Information
          </Typography.Title>

          <div>
            <img
              src={
                profileAvatar ? profileAvatar : 'http://s1.iconbird.com/ico/2013/11/504/w128h1281385326502profle.png'
              }
              alt="avatar"
            />
            <button onClick={editAvatarHandler}>Change avatar</button>
          </div>

          <Typography.Text className={styles.descr} view="primary-small" tag="p">
            Nickname:
          </Typography.Text>

          <div>
            {editName ? (
              <Input type={'text'} value={name} onChange={changeNameHandler} autoFocus className={styles.input} />
            ) : (
              <Typography.Text className={styles.descr} view="primary-medium" tag="p" onClick={editNameHandler}>
                {profileName}
              </Typography.Text>
            )}
          </div>
          <Typography.Text className={styles.descr} view="primary-small" tag="p">
            Email:
          </Typography.Text>

          <Typography.Text className={styles.descr} view="primary-medium" tag="p">
            {profileEmail}
          </Typography.Text>
          {editName && (
            <div>
              <Button size="s" view="secondary" onClick={cancelEditName}>
                Cancel
              </Button>
              <Button size="s" view="secondary" onClick={onClickSaveHandler}>
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
      <LogoutButton />
    </>
  );
};

export default Profile;
