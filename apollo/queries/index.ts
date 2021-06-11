import { gql } from 'graphql-tag'
import { RecipeFragment } from '../shared'

const GetCategories = gql`
  query GetCategories {
    getCategories {
      name
      id
      recipes {
        name
        id
        description
        ingredients
      }
    }
  }
`

const GetRecipes = gql`
  query GetRecipes {
    getRecipes {
      ...RecipeResponse
    }
  }
  ${RecipeFragment}
`

const GetOneCategory = gql`
  query getOneCategory($name: String) {
    getOneCategory(categoryNameOrId: { name: $name }) {
      id
      name
      recipes {
        ...RecipeResponse
      }
    }
  }
  ${RecipeFragment}
`

const GetOneRecipe = gql`
  query getOneRecipe($id: Int!) {
    getOneRecipe(recipeNameOrId: { id: $id }) {
      ...RecipeResponse
    }
  }
  ${RecipeFragment}
`

const MeQuery = gql`
  query me {
    me {
      id
      name
      email
    }
  }
`

export default {
  GetCategories,
  GetRecipes,
  GetOneCategory,
  GetOneRecipe,
  MeQuery,
}
