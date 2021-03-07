import React from 'react';
import { Button } from 'semantic-ui-react';
import useAuth from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import PasswordForm from '../PasswordForm/PasswordForm';
import './SettingsForm.scss';
import EmailForm from '../EmailForm/EmailForm';
import DescriptionForm from '../DescriptionForm';
import SiteWebForm from '../SiteWebForm';

const SettingsForm = (props) => {

    const { setShowModal, setTitleModal, setChildrenModal, getUser, refetch } = props;
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
        setChildrenModal(<PasswordForm logout={onLogout} />);
    }

    const onChangeEmail = () => {
        setTitleModal('Cambiar email');
        setChildrenModal(<EmailForm setShowModal={setShowModal} currentEmail={getUser.email} refetch={refetch} />);
    }

    const onChangeDescription = () => {
        setTitleModal('Actualizar descripción');
        setChildrenModal(<DescriptionForm setShowModal={setShowModal} currentDescription={getUser.description} refetch={refetch} />)
    }

    const onChangeSiteWeb = () => {
        setTitleModal('Actualizar sitio web');
        setChildrenModal(<SiteWebForm setShowModal={setShowModal} currentSiteWeb={getUser.siteWeb} refetch={refetch} />)
    }

    return (
        <div className="settings-form">
            <Button onClick={onChangePassword} >Cambiar contraseña</Button>
            <Button onClick={onChangeEmail} >Cambiar email</Button>
            <Button onClick={onChangeDescription} >Descripción</Button>
            <Button onClick={onChangeSiteWeb} >Sitio web</Button>
            <Button onClick={onLogout} >Cerrar sesión</Button>
            <Button onClick={() => setShowModal(false)} >Cancelar</Button>
        </div>
    )
}

export default SettingsForm;
