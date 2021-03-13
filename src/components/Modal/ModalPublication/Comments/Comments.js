import React, { useEffect } from 'react';
import { map } from 'lodash';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { GET_COMMENTS } from '../../../../gql/Comment';
import { useQuery } from '@apollo/client';
import NotFound from '../../../../assets/images/avatar.png';
import './Comments.scss';

const Comments = (props) => {

    const { publication } = props;
    const { data, loading, error, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
        variables: {
            idPublication: publication.id
        }
    });

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])

    if (loading) return null;
    if (error) console.log('No se pudo cargar los comentarios');

    const { getComments } = data;

    return (
        <div className="comments" >
            {
                map(getComments, (comment, index) => (
                    <Link to={`/${comment.idUser.username}`} key={index} className="comment" >
                        <Image src={comment.idUser.avatar || NotFound} avatar />
                        <div>
                            <p>{comment.idUser.username}</p>
                            <p>{comment.comment}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Comments;
