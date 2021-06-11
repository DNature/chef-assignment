import Mutations from '@/apollo/mutations'
import Queries from '@/apollo/queries'

export const types = {
  ONE_CATEGORY: 'ONE_CATEGORY',
  GET_RECIPES: 'GET_RECIPES',
  SEARCH_RECIPES: 'SEARCH_RECIPES',
  IS_LOGGED_IN: 'IS_LOGGED_IN',
  GET_CATEGORIES: 'GET_CATEGORIES',
  LOGIN: 'LOGIN',
}

export const state = () => ({
  recipes: [],
  categories: [],
  loading: false,
  isLoggedIn: false,
  username: null,
  errors: {
    path: null,
    message: null,
  },
})
export const mutations = {
  [types.GET_RECIPES](state, payload) {
    state.loading = payload.loading
    state.recipes = payload.data.getRecipes
    if (payload.errors) {
      state.errors = {
        path: 'Get recipes',
        message: payload.errors[0].message,
      }
    }
  },
  [types.ONE_CATEGORY](state, payload) {
    state.loading = payload.loading
    state.recipes = payload.data.getOneCategory.recipes
    if (payload.errors) {
      state.errors = {
        path: 'One category',
        message: payload.errors[0].message,
      }
    }
  },
  [types.SEARCH_RECIPES](state, payload) {
    state.recipes = payload
  },
  [types.IS_LOGGED_IN](state, token) {
    state.isLoggedIn = !!token
  },
  [types.GET_CATEGORIES](state, payload) {
    state.loading = payload.loading
    state.categories = payload.data
    if (payload.errors) {
      state.errors = {
        path: 'Get categories',
        message: payload.errors[0].message,
      }
    }
  },
  [types.LOGIN](state, payload) {
    state.username = payload.username
    state.loading = payload.loading
    if (payload.errors) {
      state.errors = {
        path: 'Login',
        message: payload.errors.graphQLErrors[0].message,
      }
    }
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
  async login({ commit }, input) {
    const client = this.app.apolloProvider.defaultClient
    try {
      const {
        data: { login },
        loading,
      } = await client.mutate({
        mutation: Mutations.Login,
        variables: input,
      })
      if (login.token) {
        await this.$apolloHelpers.onLogin(login.token)
        commit(types.LOGIN, { ...login, loading })
      }
    } catch (errors) {
      commit(types.LOGIN, { errors })
    }
  },
  async getCategories({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    const categories = await client.query({
      query: Queries.GetCategories,
    })
    commit(types.GET_CATEGORIES, {
      data: categories.data.getCategories,
      loading: categories.loading,
    })
  },
}
