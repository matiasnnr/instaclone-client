import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_LIKE, DELETE_LIKE, IS_LIKED, COUNT_LIKES } from '../../../../gql/Like';
import './Action.scss';

const Action = (props) => {

    const [loadingAction, setLoadingAction] = useState(false);
    const { publication } = props;
    const [addLike] = useMutation(ADD_LIKE);
    const [deleteLike] = useMutation(DELETE_LIKE);

    const {
        data,
        loading,
        refetch
    } = useQuery(IS_LIKED, {
        variables: {
            idPublication: publication.id
        }
    });

    const {
        data: dataCount,
        loading: loadingCount,
        startPolling: startPollingCount,
        stopPolling: stopPollingCount,
        refetch: refetchCount
    } = useQuery(COUNT_LIKES, {
        variables: {
            idPublication: publication.id
        }
    });

    const onAddLike = async () => {
        setLoadingAction(true);
        const vars = { variables: { idPublication: publication.id } };
        try {
            if (!isLiked) {
                await addLike(vars);
            } else {
                await deleteLike(vars);
            }
            refetch();
            refetchCount();
        } catch (error) {
            console.log(error);
        }
        setLoadingAction(false);
    }

    const onAction = () => {
        if (!loadingAction) {
            onAddLike();
        }
    }

    if (loading || loadingCount) return null;

    const { isLiked } = data;
    const { countLikes } = dataCount;

    return (
        <div className="action" >
            <Icon
                className={isLiked ? "like active" : "like"}
                name={isLiked ? "heart" : "heart outline"}
                onClick={() => onAction()}
            />
            {`${countLikes} Me gusta`}
        </div>
    )
}

export default Action;
