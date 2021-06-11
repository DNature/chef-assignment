import { gql } from 'graphql-tag'

const Login = gql`
  mutation login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      token
      username
    }
  }
`

const Register = gql`
  mutation signUp($name: String!, $email: String!, $password: String!) {
    signUp(userInput: { name: $name, email: $email, password: $password }) {
      id
      name
      email
      createdAt
      recipes {
        id
        name
      }
      categories {
        id
        name
      }
    }
  }
`

export default {
  Login,
  Register,
}
