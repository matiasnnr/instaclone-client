import React from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import './DescriptionForm.scss';
import { UPDATE_USER } from '../../../gql/User';

const DescriptionForm = (props) => {

    const { setShowModal, currentDescription, refetch } = props;

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: {
            description: currentDescription || ''
        },
        validationSchema: Yup.object({
            description: Yup.string().required()
        }),
        onSubmit: async (formValues) => {
            console.log(formValues);
            try {
                await updateUser({
                    variables: {
                        input: formValues
                    }
                });
                refetch();
                toast.success('Se ha actializado tu biografía correctamente');
                setShowModal(false);
            } catch (error) {
                toast.error('Error al actualizar tu biografía');
            }
        }
    })

    return (
        <Form className="description-form" onSubmit={formik.handleSubmit} >
            <TextArea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className={formik.errors.description && 'error'}
            />
            <Button type="submit" className="btn-submit" >
                Actualizar
            </Button>
        </Form>
    )
}

export default DescriptionForm;
