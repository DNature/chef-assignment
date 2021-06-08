import { gql } from 'graphql-tag'

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

const RecipeFragment = gql`
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

export default {
  GetCategories,
  GetRecipes,
  GetOneCategory,
  GetOneRecipe,
}
