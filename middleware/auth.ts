import Queries from '~/apollo/queries'

export default async function ({ app, redirect, route }: any) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    return redirect('/login')
  }
  // make sure the token is still valid
  try {
    const {
      data: { getCategories },
    } = await app.apolloProvider.defaultClient.query({
      query: Queries.GetCategories,
    })
    if (!Object.keys(getCategories).length) {
      return redirect(route.fullPath || '/login')
    }
    // we are good to go and validated
  } catch (e) {
    // token is not valid
    // logout user to clear storage
    try {
      await app.$apolloHelpers.onLogout()
      // redirect them to login page
      return redirect('/login')
    } catch (e) {
      console.error(e)
    }
  }
}
