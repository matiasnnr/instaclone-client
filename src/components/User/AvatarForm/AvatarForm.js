import React, { useCallback } from 'react';
import './AvatarForm.scss';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';

const AvatarForm = (props) => {

    const { setShowModal } = props;
    const onDrop = useCallback((acceptedFile) => {
        console.log(acceptedFile);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/jpg, image/png',
        noKeyboard: true,
        multiple: false, // para que solo se pueda subir uno
        onDrop
    })

    return (
        <div className="avatar-form" >
            <Button {...getRootProps()} >Cargar una foto</Button>
            <Button>Eliminar foto actual</Button>
            <Button onClick={() => setShowModal(false)} >Cancelar</Button>
            <input {...getInputProps()} />
        </div>
    )
}

export default AvatarForm
