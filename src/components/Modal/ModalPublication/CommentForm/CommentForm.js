import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ADD_COMMENT } from '../../../../gql/Comment';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import './CommentForm.scss';

const CommentForm = (props) => {

    const { publication } = props;
    const [addComment] = useMutation(ADD_COMMENT);

    const formik = useFormik({
        initialValues: {
            comment: ''
        },
        validationSchema: Yup.object({
            comment: Yup.string().required()
        }),
        onSubmit: async (formValues) => {
            try {
                await addComment({
                    variables: {
                        input: {
                            idPublication: publication.id,
                            comment: formValues.comment
                        }
                    }
                });

                formik.handleReset(); // para reiniciar el formulario

            } catch (error) {
                console.log(error);
                toast.error('No se ha podido publicar este comentario')
            }
        }
    })

    return (
        <Form className="comment-form" onSubmit={formik.handleSubmit} >
            <Form.Input
                placeholder="Añade un comentario..."
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                error={formik.errors.comment && true}
            />
            <Button type="submit" >
                Publicar
            </Button>
        </Form>
    )
}

export default CommentForm;
