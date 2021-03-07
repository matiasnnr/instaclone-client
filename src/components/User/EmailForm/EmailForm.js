import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/User';
import './EmailForm.scss';

const EmailForm = (props) => {

    const { setShowModal, currentEmail, refetch } = props;
    // devuelve updateUser que es el nombre que le dimos en graphql
    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: {
            email: currentEmail || ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required()
        }),
        onSubmit: async (formValues) => {
            try {
                await updateUser({
                    variables: {
                        input: formValues
                    }
                });
                toast.success('Se actualizó el email correctamente');
                // hace una nueva petición a graphql para actualizar los datos del cache de apollo y así mostrar los datos actualizados
                // no es que se actualice la cache, sino que se rellena la cache con datos nuevos desde graphql con una nueva petición
                // que viene desde getUser en el componente de Profile (desde ahí estamos enviando y ejecutando el refetch).
                // lo malo de esto es que genera una nueva petición o request

                // hay que tener 2 cosas en cuenta:
                // 1. si reescribimos la query ganamos en performance y en velocidad, también en optimización hacia el servidor
                // porque nos evitamos una petición al servidor
                // 2. en refetch ganamos velocidad de escritura porque escribimos mucho menos código pero requiere de una petición extra al servidor
                // que nos la podríamos ahorrar reescribiendo la query de apollo client
                refetch();
                setShowModal(false);
            } catch (error) {
                console.log(error);
                toast.error('Error al actualizar el email');
            }
        }
    })

    return (
        <Form className="email-form" onSubmit={formik.handleSubmit} >
            <Form.Input
                type='email'
                placeholder='Escribe tu nuevo email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email && true}
            />
            <Button type='sumbit' className="btn-submit" >Actualizar email</Button>
        </Form>
    )
}

export default EmailForm;
