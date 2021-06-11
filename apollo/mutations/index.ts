import { gql } from 'graphql-tag'
import { RecipeFragment } from '../shared'

const Login = gql`
  mutation login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      token
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

const DeleteRecipe = gql`
  mutation deleteRecipe($id: Int!) {
    deleteRecipe(id: $id)
  }
`

const CreateRecipe = gql`
  mutation CreateRecipe(
    $name: String!
    $description: String!
    $ingredients: String!
    $categoryName: String!
  ) {
    createRecipe(
      createRecipeInput: {
        name: $name
        description: $description
        ingredients: $ingredients
        categoryNameOrId: { name: $categoryName }
      }
    ) {
      ...RecipeResponse
    }
  }
  ${RecipeFragment}
`

export default {
  Login,
  Register,
  DeleteRecipe,
  CreateRecipe,
}
