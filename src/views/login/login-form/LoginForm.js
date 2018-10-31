import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const loginFormSchema = Yup.object().shape({
	email: Yup.string()
	.email('Debe introducir una dirección de correo electrónico válida')
	.required('El correo electrónico es obligatorio'),
	password: Yup.string()
	.min(6, 'La contraseña es muy corta')
	.required('La contraseña es obligatoria')
});

const LoginForm = (props) => {
	return (<div className="box" style={{marginTop: '30px'}}>
			<h1 className="subtitle is-4 has-text-centered">Iniciar Sesión</h1>
			<hr />
			{props.error && <div className="notification is-danger has-text-centered">{props.errorMessage}</div>}
			<Formik
			initialValues={{email: '', password: ''}}
			validationSchema={loginFormSchema}
			onSubmit={values => props.submitHandler(values)}>
			{
				({values, errors, touched}) => (
					<Form>
						<div className="field">
							<label className="label">Correo Electrónico</label>
							<div className="control">
								<Field 
								name="email" 
								className={["input", touched.email && errors.email ? "is-danger": null, touched.email && !errors.email ? "is-success": null].join(' ')} 
								type="email"
								value={values.email}
								placeholder="Correo electrónico" />
							</div>
							{ touched.email && errors.email && <p className="help is-danger">{errors.email}</p> }
						</div>
						<div className="field">
							<label className="label">Contraseña</label>
							<div className="control">
								<Field 
								name="password" 
								className={["input", touched.password && errors.password ? "is-danger": null, touched.password && !errors.password ? "is-success": null].join(' ')} 
								type="password"
								value={values.password}
								placeholder="Contraseña" />
							</div>
							{ touched.password && errors.password && <p className="help is-danger">{errors.password}</p> }
						</div>
						<button type="submit" className={["button", "is-info", "is-fullwidth", props.loading ? "is-loading": null].join(' ')} disabled={props.loading}>Enviar</button>
					</Form>)
			}
			</Formik>
		</div>);
}

export default LoginForm;