import {Form, Input} from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React from 'react'

type Props = {
    name: string;
    placeholder: string;
    dependencies?: NamePath[];
}

export const CustomPasswordInput = ({
    name,
    placeholder,
    dependencies
}: Props) => {
  return (
    <Form.Item 
    name={name}
    dependencies={dependencies}
    hasFeedback={true}
    rules={[{required: true, message: 'Обязательное поле'}]}
    >
        <Input.Password
        placeholder={placeholder}
        size='large'
        />
    </Form.Item>
  )
}
