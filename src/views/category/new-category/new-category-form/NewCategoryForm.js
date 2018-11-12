import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Card, Input, Alert } from 'antd';

const NewCategoryForm = props => {
  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .trim()
          .min(4, 'El nombre de la categoría es muy corto')
          .max(32, 'El nombre de la categoría es muy largo')
          .required('Debes escribir un nombre')
      })}
      onSubmit={(values, { setSubmitting }) => {
        props.onSubmit(values, setSubmitting);
      }}>
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleSubmit,
        handleBlur,
        handleChange
      }) => (
        <Card style={{ marginTop: '80px' }}>
          <h1 style={{ fontSize: 'xx-large', textAlign: 'center' }}>
            Nueva Categoría
          </h1>
          {props.error && (
            <Alert
              type="error"
              description="Ocurrió un error al intentar crear la categoría"
              showIcon
              closable
            />
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Item
              label="Nombre de la categoría"
              hasFeedback
              validateStatus={
                touched.name && errors.name
                  ? 'error'
                  : touched.name && !errors.name
                    ? 'success'
                    : null
              }
              help={touched.name && errors.name}>
              <Input
                name="name"
                placeholder="Nombre de la categoría..."
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={isSubmitting}
                value={values.name}
              />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              block
              loading={isSubmitting}>
              Enviar
            </Button>
          </Form>
        </Card>
      )}
    </Formik>
  );
};

export default NewCategoryForm;
