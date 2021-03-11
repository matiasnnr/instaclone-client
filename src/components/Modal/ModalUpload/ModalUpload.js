import React, { useCallback, useState } from 'react';
import { Modal, Icon, Button, Dimmer, Loader } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import './ModalUpload.scss';

const ModalUpload = (props) => {

    const { show, setShow } = props;
    const [fileUpload, setFileUpload] = useState(null);
    console.log(fileUpload);

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
        setShow(false);
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
            {fileUpload?.type === "image" && (
                <div
                    className="image"
                    style={{ backgroundImage: `url("${fileUpload.preview}")` }}
                />
            )}
        </Modal>
    )
}

export default ModalUpload;
