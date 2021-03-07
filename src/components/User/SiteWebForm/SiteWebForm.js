import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/User';
import './SiteWebForm.scss';

const SiteWebForm = (props) => {

    const { setShowModal, currentSiteWeb, refetch } = props;

    const [updateUser] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: {
            siteWeb: currentSiteWeb || ""
        },
        validationSchema: Yup.object({
            siteWeb: Yup.string().required()
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
                setShowModal(false);
                toast.success('Se ha actualizado el sitio web correctamente');
            } catch (error) {
                toast.error('Error al actualizar sitio web');
            }
        }
    });

    return (
        <Form className="siteweb-form" onSubmit={formik.handleSubmit} >
            <Form.Input
                type='text'
                placeholder='Url de tu sitio web'
                name='siteWeb'
                value={formik.values.siteWeb}
                onChange={formik.handleChange}
                error={formik.errors.siteWeb && true}
            />
            <Button type='sumbit' className="btn-submit" >Actualizar sitio web</Button>
        </Form>
    )
}

export default SiteWebForm;
