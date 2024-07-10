import React from "react";
import { Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";

type Props = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
};

export const CustomPasswordInput = ({
  name,
  placeholder,
  dependencies,
}: Props) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback={true}
      rules={[
        {
          required: true,
          message: "Обязательное поле!",
        },
        //Взято из And Design FORM "passworld"
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }

            if (name === "confirmPassword") {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Пароль не совподают"));
            } else {
              if (value.length < 6) {
                return Promise.reject(
                  new Error("Пароль должен быть длиннее 6-ти символов")
                );
              }

              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} size="large" />
    </Form.Item>
  );
};
