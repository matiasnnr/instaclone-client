import React from 'react';
import { useParams } from 'react-router-dom';

const User = () => {

    const params = useParams();

    console.log(params);

    return (
        <div>
            <h1>{`User: ${params.username}`}</h1>
        </div>
    )
}

export default User;
