import React from 'react';
import { Layout, Space, Typography } from 'antd';
import {
  LoginOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { CustomButton } from '../custom-button';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';

import styles from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/auth/authSlice';

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcons} />
        <Link to='/'>
          <CustomButton type='link'>
            <Typography.Title level={1}>Сотридников</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          type='link'
          icon={<LogoutOutlined />}
          onClick={onLogoutClick}
        >
          Выйти
        </CustomButton>
      ) : (
        <Space>
          <Link to='/register'>
            <CustomButton type='link' icon={<UserOutlined />}>
              Зарегистрироваться
            </CustomButton>
          </Link>
          <Link to='/login'>
            <CustomButton type='link' icon={<LoginOutlined />}>
              Войти
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
