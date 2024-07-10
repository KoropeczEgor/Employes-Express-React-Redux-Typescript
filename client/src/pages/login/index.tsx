
import React from "react";
import { Card, Form, Row, Space, Typography } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, UserData } from "../../app/services/auth";
import { Layout } from "../../components/layout";
import { CustomInput } from "../../components/custom-input";
import { CustomPasswordInput } from "../../components/custom-password-input";
import { CustomButton } from "../../components/custom-button";
import { Paths } from "../../paths";


export const Login = () => {
  const navigate = useNavigate();
  const [error, setErroe] = useState("");
  const user = useSelector(selectUser);
  const [loginUser, loginUserResult] = useLoginMutation();

  const login = async(data: UserData) => {
    try {
      await loginUser(data).unwrap();


    }
  }
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <CustomInput type="email" name="email" placeholder="Email" />
            <CustomPasswordInput name="password" placeholder="Пароль" />
            <CustomButton type="primary" htmlType="submit">
              Войти
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
