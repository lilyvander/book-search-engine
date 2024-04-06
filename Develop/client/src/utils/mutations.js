import { gql } from '@apollo/client' 

export const LOGIN_USER_MUTATION = gql`
mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
` ;

export const SIGNUP_USER_MUTATION = gql `

`;

export const SAVE_BOOK_MUTATION = gql `

`;

export const DELETE_BOOK_MUTATION = gql `

`;

