import React from 'react';
import { Button } from 'semantic-ui-react';
import useAuth from '../../../../hooks/useAuth';
import './HeaderProfile.scss';

const HeaderProfile = (props) => {

    const { getUser, handleModal } = props;
    const { auth } = useAuth();

    return (
        <div className="header-profile" >
            <h2>{`${getUser.username.charAt(0).toUpperCase()}${getUser.username.slice(1)}`}</h2>
            {
                getUser.username === auth.username
                    ?
                    <Button onClick={() => handleModal('settings')} >Ajustes</Button>
                    :
                    <Button >Seguir</Button>
            }
        </div>
    )
}

export default HeaderProfile;
