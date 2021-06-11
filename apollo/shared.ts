import { gql } from 'graphql-tag'
export const RecipeFragment = gql`
  fragment RecipeResponse on Recipe {
    id
    name
    description
    ingredients
    user {
      name
      email
    }
    category {
      name
      id
    }
    createdAt
    updatedAt
  }
`
