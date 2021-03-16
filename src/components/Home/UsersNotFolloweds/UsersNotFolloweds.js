import React, { useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_NOT_FOLLOWEDS } from '../../../gql/Follow';
import NotFound from '../../../assets/images/avatar.png';
import './UsersNotFolloweds.scss';

const UsersNotFolloweds = () => {

    const { data, loading, startPolling, stopPolling } = useQuery(GET_NOT_FOLLOWEDS);

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling]);

    if (loading) return null;

    const { getNotFolloweds } = data;

    return (
        <div className="users-not-followeds" >
            <h3>Usuarios que no sigues</h3>
            {
                map(getNotFolloweds, (user, index) => (
                    <Link key={index} to={`/${user.username}`} className="users-not-followeds__user" >
                        <Image src={user.avatar || NotFound} avatar />
                        <span>{user.name}</span>
                    </Link>
                ))
            }
        </div>
    )
}

export default UsersNotFolloweds;
