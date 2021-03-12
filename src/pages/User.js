import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../components/User/Profile';
import { size } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS } from '../gql/Publication';
import Publications from '../components/Publications';

const User = () => {

    const { username } = useParams();
    const { data, loading, error, startPolling, stopPolling } = useQuery(GET_PUBLICATIONS, {
        variables: { username }
    });

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])

    if (loading) return null;
    if (error) console.log(error);

    const { getPublications } = data;


    return (
        <>
            <Profile username={username} totalPublications={size(getPublications)} />
            <Publications getPublications={getPublications} />
        </>
    )
}

export default User;
