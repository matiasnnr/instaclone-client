import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/User';
import { toast } from 'react-toastify';
import './PasswordForm.scss';

const PasswordForm = ({ logout }) => {

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string().required()
                .oneOf([Yup.ref('repeatNewPassword')]), // con esto le decimos que esta password tiene que ser exactamente igual a repeatNewPassword para pasar la validación
            repeatNewPassword: Yup.string().required()
                .oneOf([Yup.ref('newPassword')]), // con esto le decimos que esta password tiene que ser exactamente igual a newPassword para pasar la validación
        }),
        onSubmit: async (formValues) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            currentPassword: formValues.currentPassword,
                            newPassword: formValues.newPassword
                        }
                    }
                })

                if (!result.data.updateUser) {
                    toast.error('Error al cambiar la contraseña')
                } else {
                    toast.success('Se ha actualizado la contraseña correctamente');
                    logout();
                }

            } catch (error) {
                toast.error('Error al cambiar la contraseña ', error)
            }
        }
    });

    return (
        <Form className="password-form" onSubmit={formik.handleSubmit} >
            <Form.Input
                type="password"
                placeholder='Contraseña actual'
                name='currentPassword'
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={formik.errors.currentPassword && true}
            />
            <Form.Input
                type="password"
                placeholder='Nueva contraseña'
                name='newPassword'
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.errors.newPassword && true}
            />
            <Form.Input
                type="password"
                placeholder='Repetir nueva contraseña'
                name='repeatNewPassword'
                value={formik.values.repeatNewPassword}
                onChange={formik.handleChange}
                error={formik.errors.repeatNewPassword && true}
            />
            <Button type='submit' className="btn-submit" >Actualizar contraseña</Button>
        </Form>
    )
}

export default PasswordForm;

function initialValues() {
    return {
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    }
}