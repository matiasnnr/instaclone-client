import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../components/User/Profile';
import { size } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS } from '../gql/Publication';

const User = () => {

    const { username } = useParams();
    const { data, loading, error } = useQuery(GET_PUBLICATIONS, {
        variables: { username }
    });

    if (loading) return null;
    if (error) console.log(error);

    const { getPublications } = data;


    return (
        <>
            <Profile username={username} totalPublications={size(getPublications)} />
        </>
    )
}

export default User;
