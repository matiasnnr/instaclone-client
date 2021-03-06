import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/User';
import { Grid, Image } from 'semantic-ui-react';
import NotFound from '../../../assets/images/avatar.png';
import UserNotFound from '../../UserNotFound';
import useAuth from '../../../hooks/useAuth';
import ModalBasic from '../../Modal/ModalBasic';
import AvatarForm from '../AvatarForm';
import './Profile.scss';
import HeaderProfile from './HeaderProfile/HeaderProfile';
import SettingsForm from '../SettingsForm/SettingsForm';
import Followers from './Followers/Followers';

const Profile = ({ username, totalPublications }) => {

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [childrenModal, setChildrenModal] = useState(null);

    const { auth } = useAuth();
    console.log(auth);

    // trae toda la info del usuario que estamos viendo por su username en la url
    const { data, loading, error, refetch } = useQuery(GET_USER, {
        variables: { username }
    });

    if (loading) return null;
    if (error) return <UserNotFound />

    const { getUser } = data;

    const handleModal = (type) => {
        switch (type) {
            case 'avatar':
                setTitleModal('Cambiar foto de perfil');
                setChildrenModal(<AvatarForm setShowModal={setShowModal} auth={auth} />);
                setShowModal(true);
                break;

            case 'settings':
                setTitleModal('');
                setChildrenModal(
                    <SettingsForm
                        setShowModal={setShowModal}
                        setTitleModal={setTitleModal}
                        setChildrenModal={setChildrenModal}
                        getUser={getUser}
                        refetch={refetch}
                    />);
                setShowModal(true);
                break;

            default:
                break;
        }
    }

    return (
        <>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left" >
                    <Image src={getUser.avatar ? getUser.avatar : NotFound}
                        avatar
                        alt="Not Found"
                        onClick={() => auth.username === username && handleModal('avatar')}
                    />
                </Grid.Column>
                <Grid.Column width={11} className="profile__right" >
                    <HeaderProfile getUser={getUser} handleModal={handleModal} />
                    <Followers username={username} totalPublications={totalPublications} />
                    <div className="other">
                        <p className="name" >{getUser.name}</p>
                        {
                            getUser.siteWeb
                            &&
                            <a href={getUser.siteWeb} className="siteWeb" target="_blank" rel="noreferrer" >
                                {getUser.siteWeb}
                            </a>
                        }
                        {
                            getUser.description
                            &&
                            <p className="description">
                                {getUser.description}
                            </p>
                        }
                    </div>
                </Grid.Column>
            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal} >
                {childrenModal}
            </ModalBasic>
        </>
    )
}

export default Profile;
