import React, { useEffect, useState } from 'react';
import { size } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_FOLLOWERS, GET_FOLLOWEDS } from '../../../../gql/Follow';
import ModalBasic from '../../../Modal/ModalBasic';
import ListUsers from '../../ListUsers/ListUsers';
import './Followers.scss';

const Followers = (props) => {

    const { username } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [childrenModal, setChildrenModal] = useState(null);

    // data: dataFollowers = data as dataFollowers
    const {
        data: dataFollowers,
        loading: loadingFollowers,
        error: errorFollowers,
        startPolling: startPollingFollowers,
        stopPolling: stopPollingFollowers
    } = useQuery(GET_FOLLOWERS, { variables: { username } });

    const {
        data: dataFolloweds,
        loading: loadingFolloweds,
        error: errorFolloweds,
        startPolling: startPollingFolloweds,
        stopPolling: stopPollingFolloweds
    } = useQuery(GET_FOLLOWEDS, { variables: { username } });

    // ojo, que quizás es mejor usar refetch para el caso de los Followeds
    // lo usamos para realizar llamadas al servicio cada cierto tiempo (quizás lo mejor sería usar subscription de graphql)
    // esto puede afectar el rendimiento del servidor ya que se hacen muchas llamadas (una cada segundo)
    // pero lo bueno es que react no renderiza el componente en cada llamada, 
    // solo lo hace cuando el dato que viene desde el servicio es distinto al que tenemos actualmente.
    useEffect(() => {
        startPollingFollowers(1000);
        return () => {
            stopPollingFollowers();
        }
    }, [startPollingFollowers, stopPollingFollowers]);

    useEffect(() => {
        startPollingFolloweds(1000);
        return () => {
            stopPollingFolloweds();
        }
    }, [startPollingFolloweds, stopPollingFolloweds]);

    const openFollowers = () => {
        setTitleModal('Seguidores');
        setChildrenModal(<ListUsers users={getFollowers} setShowModal={setShowModal} />);
        setShowModal(true);
    }

    const openFolloweds = () => {
        setTitleModal('Seguidos');
        setChildrenModal(<ListUsers users={getFolloweds} setShowModal={setShowModal} />)
        setShowModal(true);
    }

    if (loadingFollowers || loadingFolloweds) return null;
    if (errorFollowers || errorFolloweds) return null;

    const { getFollowers } = dataFollowers;
    const { getFolloweds } = dataFolloweds;

    return (
        <>
            <div className="followers">
                <p
                    className="link"
                >
                    <span>**</span> publicaciones
                </p>

                <p
                    className="link"
                    onClick={openFollowers}
                >
                    <span>{size(getFollowers)}</span> {size(getFollowers) === 1 ? 'seguidor' : 'seguidores'}
                </p>

                <p
                    className="link"
                    onClick={openFolloweds}
                >
                    <span>{size(getFolloweds)}</span> {size(getFolloweds) === 1 ? 'seguido' : 'seguidos'}
                </p>
            </div>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal} >
                {childrenModal}
            </ModalBasic>
        </>
    )
}

export default Followers;
