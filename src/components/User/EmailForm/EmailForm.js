import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import './EmailForm.scss';

const EmailForm = (props) => {

    const { setShowModal, currentEmail } = props;

    const formik = useFormik({
        initialValues: {
            email: currentEmail || ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required()
        }),
        onSubmit: (formValues) => console.log(formValues)
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
