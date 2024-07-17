import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Descriptions, Space, Divider, Modal } from 'antd';
import { CustomButton } from '../../components/custom-button';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { isErrorWithMessage } from '../../utils/is-error-message';
import { ErrorMessage } from '../../components/error-message';
import { Layout } from '../../components/layout';
import { Paths } from '../../paths';
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom';
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from '../../app/services/employees';

export const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <span>Загрузка</span>;
  }
  if (!data) {
    return <Navigate to='/' />;
  }

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleDeleteUser = async () => {
    hideModal();

    try {
      await removeEmployee(data.id).unwrap();

      navigate(`${Paths.status}/deleted`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError('Ошибка');
      }
    }
  };

  return (
    <Layout>
      <Descriptions title='Информация/сотруднике' bordered>
        <Descriptions.Item
          label='Имя'
          span={3}
        >{`${data.firstName} ${data.LastName}`}</Descriptions.Item>
        <Descriptions.Item label='Возраст' span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label='Адресс' span={3}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation='left'>Действия</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <CustomButton
                shape='round'
                type='default'
                icon={<EditOutlined />}
              >
                Редактировать
              </CustomButton>
            </Link>
            <CustomButton
              shape='round'
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Удалить
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title='Подтвердите удаление'
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText='Подтвердить'
        cancelText='Отменить'
      >
        Вы действительно хотите удалить сотрудника из таблицы?
      </Modal>
    </Layout>
  );
};
