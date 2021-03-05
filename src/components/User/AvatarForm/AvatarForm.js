import React, { useCallback, useState } from 'react';
import './AvatarForm.scss';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { GET_USER, UPDATE_AVATAR, DELETE_AVATAR } from '../../../gql/User';
import { toast } from 'react-toastify';

const AvatarForm = (props) => {

    const { setShowModal, auth } = props;

    const [loading, setLoading] = useState(false);

    const [updateAvatar] = useMutation(UPDATE_AVATAR, {
        // todo esto para actualizar cache de apollo server con los nuevos datos de la respuesta de grapgql
        update(cache, { data: { updateAvatar } }) { // desde updateAvatar nos llega el {status y el urlAvatar} como respuesta
            // getUser contiene los datos de la cache
            const { getUser } = cache.readQuery({
                query: GET_USER, // query que queremos leer desde el cache de apollo 
                variables: { username: auth.username } // variables para identificar la query (donde username sea igual a auth.username)
            });

            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username },
                data: {
                    // le pasamos todos los datos que traemos del getUser anterior y seteamos los nuevos
                    getUser: { ...getUser, avatar: updateAvatar.urlAvatar }
                }
            })
        }
    });

    const [deleteAvatar] = useMutation(DELETE_AVATAR, {
        update(cache) {
            const { getUser } = cache.readQuery({ // obtenemos datos del cache de apollo
                query: GET_USER, // query que queremos leer desde el cache de apollo 
                variables: { username: auth.username } // variables para identificar la query (donde username sea igual a auth.username)
            });

            cache.writeQuery({ // reescribir o actualizar datos de una query
                query: GET_USER, // query que queremos reescribir
                variables: { username: auth.username }, // parámetros que necesita esta query para poder obtenerla
                data: { // nueva información para sobreescribir la query con datos nuevos
                    getUser: {
                        ...getUser, avatar: ''
                    }
                }
            })
        }
    });

    const onDeleteAvatar = async () => {
        try {
            const result = await deleteAvatar();
            const { data } = result;

            if (!data.deleteAvatar) {
                toast.warning('Error al borrar el avatar');
            } else {
                setShowModal(false);
            }
        } catch (error) {
            toast.warning('Error al borrar el avatar: ', error);
        }
    }

    const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];

        try {
            setLoading(true);
            const result = await updateAvatar({ variables: { file } });
            const { data } = result;

            if (!data.updateAvatar.status) {
                toast.error('Error al actualizar el avatar');
                setLoading(false);
            } else {
                toast.success('El avatar se ha actualizado correctamente');
                setLoading(false);
                setShowModal(false);
            }
            console.log(result);
        } catch (error) {
            console.log(error);
        }

    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/jpg, image/png',
        noKeyboard: true,
        multiple: false, // para que solo se pueda subir uno
        onDrop
    })

    return (
        <div className="avatar-form" >
            <Button {...getRootProps()} loading={loading} >Cargar una foto</Button>
            <Button onClick={onDeleteAvatar} >Eliminar foto actual</Button>
            <Button onClick={() => setShowModal(false)} >Cancelar</Button>
            <input {...getInputProps()} />
        </div>
    )
}

export default AvatarForm;
