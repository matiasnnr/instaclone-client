import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import './RegisterForm.scss';
import { useFormik } from 'formik';

export default function RegisterForm(props) {

    const { setShowLogin } = props;

    const formik = useFormik({
        initialValues: {
            // los valores del input tienen que ser el mismo name="" que se le puso en el formulario
            name: "",
            username: "",
            email: "",
            password: "",
            repeatPassword: ""
        },
        validationSchema: null, // si nuestra validación no es correcta, el onSubmit nunca se va a ejecutar
        onSubmit: (formValue) => {
            console.log("Form enviado");
            console.log(formValue);
        }
    });

    return (
        <>
            <h2 className="register-form-title">Regístrate para ver fotos y vídeos de tus amigos.</h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    type="text"
                    placeholder="Nombre y apellidos"
                    name="name"
                    onChange={formik.handleChange}
                />
                <Form.Input
                    type="text"
                    placeholder="Nombre de usuario"
                    name="username"
                    onChange={formik.handleChange}
                />
                <Form.Input
                    type="text"
                    placeholder="Correo electrónico"
                    name="email"
                    onChange={formik.handleChange}
                />
                <Form.Input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    onChange={formik.handleChange}
                />
                <Form.Input
                    type="password"
                    placeholder="Repetir contraseña"
                    name="repeatPassword"
                    onChange={formik.handleChange}
                />
                <Button
                    type="submit"
                    className="btn-submit"
                >
                    Registrarse
                </Button>
            </Form>
        </>
    )
}
