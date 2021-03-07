import { gql } from '@apollo/client';

// Esto es lo que va a devolver el mutation una vez que se ejecute
export const REGISTER = gql`
    mutation register($input: UserInput){
        register(input: $input) {
            id
            name
            username
            email
            createdAt
        }
    }
`;

export const LOGIN = gql`
    mutation login($input: LoginInput) {
        login(input: $input){
            token
        }
    }
`;

export const GET_USER = gql`
    query getUser($id: ID, $username: String){
        getUser(id: $id, username: $username){
            id
            name
            username
            email
            siteWeb
            description
            avatar
        }
    }
`;

export const UPDATE_AVATAR = gql`
    mutation updateAvatar($file: Upload){
        updateAvatar(file: $file) {
            status
            urlAvatar
        }
    }
`;

export const DELETE_AVATAR = gql`
    mutation deleteAvatar {
        deleteAvatar
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($input: UserUpdateInput) {
        updateUser(input: $input)
    }
`;