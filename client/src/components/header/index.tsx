import React from 'react'
import { Layout, Space, Typography } from 'antd'
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { CustomButton } from '../custom-button'
import { Link } from 'react-router-dom'
import { Paths } from '../../paths'


import styles from "./index.module.css"

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcons}/>
        <Link to={Paths.home}>
        <CustomButton 
        type='link' 
        >
          <Typography.Title level={1}>
            Сотридников
          </Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {/* //Space это расстояние между  */}
      <Space>
        <Link to={Paths.register}>
          <CustomButton type="primary" icon={<LoginOutlined/>}>
            Зарегистрировать
          </CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton type="primary" icon={<UserOutlined/>}>
            Войти
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
    
  )
}
