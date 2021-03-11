import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { IS_FOLLOW, FOLLOW, UN_FOLLOW } from '../../../../gql/Follow';
import useAuth from '../../../../hooks/useAuth';
import './HeaderProfile.scss';

const HeaderProfile = (props) => {

    const [onLoading, setOnLoading] = useState(false);
    const { getUser, handleModal } = props;
    const { auth } = useAuth();

    const [follow] = useMutation(FOLLOW);
    const [unFollow] = useMutation(UN_FOLLOW);

    const { data, loading, refetch } = useQuery(IS_FOLLOW, {
        variables: { username: getUser.username }
    });

    useEffect(() => {
        console.log('loading', loading);
        console.log('data', data);
        setOnLoading(false);
    }, [data])

    const buttonFollow = () => {
        if (data.isFollow) {
            return <Button className="btn-danger" onClick={onUnFollow} loading={onLoading} >Dejar de seguir</Button>
        } else {
            return <Button className="btn-action" onClick={onFollow} loading={onLoading} >Seguir</Button>
        }
    };

    const onFollow = async () => {
        console.log('Follow');
        try {
            setOnLoading(true);
            await follow({ variables: { username: getUser.username } });
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    const onUnFollow = async () => {
        console.log('unFollow');
        try {
            setOnLoading(true);
            await unFollow({ variables: { username: getUser.username } });
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="header-profile" >
                <h2>{`${getUser.username.charAt(0).toUpperCase()}${getUser.username.slice(1)}`}</h2>
                {
                    getUser.username === auth.username
                        ?
                        <Button onClick={() => handleModal('settings')} >Ajustes</Button>
                        :
                        !loading && buttonFollow()
                }
            </div>
        </>
    )
}

export default HeaderProfile;
