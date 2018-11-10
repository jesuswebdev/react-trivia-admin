import React from 'react';
import { Button, Card, Form, Icon, Input, Alert } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Debe introducir una dirección de correo electrónico válida')
    .required('El correo electrónico es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña es muy corta')
    .required('La contraseña es obligatoria')
});

const LoginForm = props => {
  return (
    <Card>
      <h1 style={{ textAlign: 'center', fontSize: 'x-large' }}>
        Iniciar Sesión
      </h1>
      <hr />
      {props.error && (
        <Alert
          style={{ marginBottom: '10px' }}
          type="error"
          showIcon
          description={props.errorMessage}
        />
      )}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginFormSchema}
        onSubmit={(values, { setSubmitting }) =>
          props.submitHandler(values, setSubmitting)
        }>
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleBlur,
          handleChange,
          handleSubmit
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Item
              hasFeedback
              validateStatus={
                touched.email && errors.email
                  ? 'error'
                  : touched.email && !errors.email
                    ? 'success'
                    : null
              }
              help={touched.email && errors.email}>
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                placeholder="Correo Electrónico"
                value={values.email}
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              validateStatus={
                touched.password && errors.password
                  ? 'error'
                  : touched.password && !errors.password
                    ? 'success'
                    : null
              }
              help={touched.password && errors.password}>
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                type="password"
                placeholder="Contraseña"
                value={values.password}
              />
            </Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={isSubmitting}>
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default LoginForm;
