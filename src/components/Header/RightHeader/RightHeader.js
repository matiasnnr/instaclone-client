import React from 'react';
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import './RightHeader.scss';
import useAuth from '../../../hooks/useAuth';
import NotFound from '../../../assets/images/avatar.png';
import { GET_USER } from '../../../gql/User';

const RightHeader = () => {

    const { auth } = useAuth();
    // query que se realiza en graphql (se le pasa el id o username para la búsqueda)
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { username: auth.username }
    });

    if (loading || error) return null;

    const { getUser } = data;

    return (
        <div className="right-header">
            <Link to="/">
                <Icon name="home" />
            </Link>
            <Icon name="plus" />
            <Link to={`/${auth.username}`}>
                <Image src={getUser.avatar ? getUser.avatar : NotFound} avatar />
            </Link>
        </div>
    )
}

export default RightHeader;
