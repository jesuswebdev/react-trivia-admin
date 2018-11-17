import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Input, Alert } from 'antd';

const FormItem = Form.Item;

class CategoryForm extends Component {
  render() {
    const { props } = this;
    return (
      <Formik
        initialValues={props.initialValues}
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
        {({ values, isSubmitting }) => (
          <Fragment>
            <h1 style={{ fontSize: 'xx-large', textAlign: 'center' }}>
              {props.title}
            </h1>
            {props.error && (
              <Alert
                type="error"
                description={props.errorMessage}
                showIcon
                closable
              />
            )}
            <FormikForm>
              <Field
                name="name"
                render={({ field, form: { touched, errors } }) => (
                  <FormItem
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
                      {...field}
                      placeholder="Nombre de la categoría..."
                      disabled={isSubmitting}
                    />
                  </FormItem>
                )}
              />
              <Button
                htmlType="submit"
                type="primary"
                block
                disabled={values.name === props.initialValues.name}
                loading={isSubmitting}>
                {props.buttonText}
              </Button>
            </FormikForm>
          </Fragment>
        )}
      </Formik>
    );
  }
}

CategoryForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  buttonText: PropTypes.string
};

CategoryForm.defaultProps = {
  title: '',
  initialValues: { name: '' },
  error: false,
  onSubmit: () => {},
  errorMessage: 'Ocurrió un error',
  buttonText: 'Enviar'
};

export default CategoryForm;
