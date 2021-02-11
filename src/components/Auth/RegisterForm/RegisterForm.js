import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import './RegisterForm.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function RegisterForm(props) {

    const { setShowLogin } = props;

    const formik = useFormik({
        initialValues: initialFormValues(),
        validationSchema: validatingSchemas(), // si nuestra validación no es correcta, el onSubmit nunca se va a ejecutar
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
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name && true}
                />
                <Form.Input
                    type="text"
                    placeholder="Nombre de usuario"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.errors.username && true}
                />
                <Form.Input
                    type="text"
                    placeholder="Correo electrónico"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email && true}
                />
                <Form.Input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password && true}
                />
                <Form.Input
                    type="password"
                    placeholder="Repetir contraseña"
                    name="repeatPassword"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.repeatPassword && true}
                />
                <Button
                    type="submit"
                    className="btn-submit"
                >
                    Registrarse
                </Button>
                {/* <Button
                    type="button"
                    onClick={formik.handleReset}
                >
                    Limpiar formulario
                </Button> */}
            </Form>
        </>
    )
}

function initialFormValues() {
    // los valores del input tienen que ser el mismo name="" que se le puso en el formulario
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
}

function validatingSchemas() {
    return Yup.object({
        name: Yup.string().required("Tu nombre es obligatorio"),
        username: Yup.string()
            .matches(/^[a-zA-Z0-0-]*$/, "El nombre del usuario no puede tener espacios")
            .required("El nombre de usuario es obligatorio"),
        email: Yup.string().email("El email no es válido").required("El email es obligatorio"),
        password: Yup.string()
            .required("La contraseña es obligatoria")
            .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales"),
        repeatPassword: Yup.string()
            .required("La contraseña es obligatoria")
            .oneOf([Yup.ref("password")], "Las contraseñas no son iguales")

    });
}