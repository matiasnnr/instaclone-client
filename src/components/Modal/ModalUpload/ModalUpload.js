import React, { useCallback, useState } from 'react';
import { Modal, Icon, Button, Dimmer, Loader } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { PUBLISH } from '../../../gql/Publication';
import { toast } from 'react-toastify';
import './ModalUpload.scss';

const ModalUpload = (props) => {

    const { show, setShow } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [fileUpload, setFileUpload] = useState(null);

    const [publish] = useMutation(PUBLISH);

    // acá llegará el fichero que el usuario está subiendo en useDropzone
    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        setFileUpload({
            type: "image", // "video"
            file,
            preview: URL.createObjectURL(file),
        })
    });

    // getRootProps: para la caja que envuelve nuestro input
    // getInputProps: para añadir los props a nuestro input para poder subir imágenes
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png", // video, etc
        noKeyboard: true,
        multiple: false,
        onDrop
    })

    const onClose = () => {
        setIsLoading(false);
        setFileUpload(null);
        setShow(false);
    }

    const onPublish = async () => {
        try {
            setIsLoading(true);
            const result = await publish({
                variables: {
                    file: fileUpload.file
                }
            });

            const { data } = result;

            if (!data.publish.status) {
                toast.warning('No se pudo subir la imagen correctamente');
                setIsLoading(false);
            } else {
                onClose();
            }

        } catch (error) {
            console.log(error);
            toast.error('No se pudo subir la imagen correctamente');
        }
    }

    return (
        <Modal
            className="modal-upload"
            size="small"
            open={show}
            onClose={onClose}
        >
            <div
                {...getRootProps()}
                className="dropzone"
                style={fileUpload && { border: 0 }} // quita el dashed border cuando se sube una imagen
            >
                {
                    !fileUpload && // si fileUpload no tiene data, entonces mostramos el dashed border y el texto
                    <>
                        <Icon name="cloud upload" />
                        <p>Arrastra o haz click aquí y sube la foto que quieras publicar</p>
                        <input {...getInputProps()} />
                    </>
                }
            </div>

            {
                fileUpload?.type === "image"
                &&
                <div
                    className="image"
                    style={{ backgroundImage: `url("${fileUpload.preview}")` }}
                />
            }

            {
                fileUpload
                &&
                <Button
                    className="btn-upload btn-action"
                    onClick={onPublish}
                >
                    Publicar
                    </Button>
            }

            {
                isLoading
                &&
                // dimmer deja un fondo negro con opacidad para que se vea bien lo que se encuentra en su interior
                <Dimmer
                    className="publishing"
                    active
                >
                    <Loader />
                    <p>Publicando...</p>
                </Dimmer>
            }
        </Modal>
    )
}

export default ModalUpload;
