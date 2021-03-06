import React from 'react';
import { Button } from 'semantic-ui-react';
import useAuth from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import PasswordForm from '../PasswordForm/PasswordForm';
import './SettingsForm.scss';

const SettingsForm = (props) => {

    const { setShowModal, setTitleModal, setChildrenModal } = props;
    const { logout } = useAuth();
    const history = useHistory();
    const client = useApolloClient();

    const onLogout = () => {
        client.clearStore();
        logout();
        history.push('/');
    }

    const onChangePassword = () => {
        setTitleModal('Cambiar contraseña');
        setChildrenModal(
            <PasswordForm />
        );
    }

    return (
        <div className="settings-form">
            <Button onClick={onChangePassword} >Cambiar contraseña</Button>
            <Button>Cambiar email</Button>
            <Button>Descripción</Button>
            <Button>Sitio web</Button>
            <Button onClick={onLogout} >Cerrar sesión</Button>
            <Button onClick={() => setShowModal(false)} >Cancelar</Button>
        </div>
    )
}

export default SettingsForm;
