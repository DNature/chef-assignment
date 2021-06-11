import Queries from '@/apollo/queries'

export const types = {
  ONE_CATEGORY: 'ONE_CATEGORY',
  GET_RECIPES: 'GET_RECIPES',
  SEARCH_RECIPES: 'SEARCH_RECIPES',
  IS_LOGGED_IN: 'IS_LOGGED_IN',
}

export const state = {
  recipes: [],
  loading: false,
  isLoggedIn: false,
}
export const mutations = {
  [types.ONE_CATEGORY](state, payload) {
    state.loading = payload.loading
    state.recipes = payload.data.getOneCategory.recipes
  },
  [types.GET_RECIPES](state, payload) {
    state.loading = payload.loading
    state.recipes = payload.data.getRecipes
  },
  [types.SEARCH_RECIPES](state, payload) {
    state.recipes = payload
  },
  [types.IS_LOGGED_IN](state, token) {
    state.isLoggedIn = !!token
  },
}

export const actions = {
  async getRecipes({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    const recipes = await client.query({
      query: Queries.GetRecipes,
    })
    commit(types.GET_RECIPES, recipes)
  },
  async oneCategory({ commit }, name) {
    const client = this.app.apolloProvider.defaultClient
    const category = await client.query({
      query: Queries.GetOneCategory,
      variables: {
        name,
      },
    })
    commit(types.ONE_CATEGORY, category)
  },
  searchRecipe({ commit, state }, input) {
    const recipes = state.recipes.filter(
      (i) =>
        i.name.toLowerCase().includes(input.toLowerCase()) ||
        i.description.toLowerCase().includes(input.toLowerCase())
    )
    commit(types.SEARCH_RECIPES, recipes)
  },
  loggedIn({ commit }) {
    const token = this.app.$apolloHelpers.getToken()
    commit(types.IS_LOGGED_IN, token)
  },
}
