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