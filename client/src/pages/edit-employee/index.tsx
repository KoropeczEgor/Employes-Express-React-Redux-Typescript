import { Employee } from '@prisma/client';
import { Layout, Row } from 'antd';
import { Paths } from '../../paths';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from '../../app/services/employees';
import { isErrorWithMessage } from '../../utils/is-error-message';
import { EmployeeForm } from '../../components/employee-from';

export const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState('');
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [editEmployee] = useEditEmployeeMutation();

  if (isLoading) {
    return <span>Loading</span>;
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };

      await editEmployee(editedEmployee).unwrap();

      navigate(`${Paths.status}/created`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <EmployeeForm
          onFinish={handleEditUser}
          title='Редактировать сотрудника'
          employee={data}
          btnText='Редактировать'
          error={error}
        />
      </Row>
    </Layout>
  );
};
