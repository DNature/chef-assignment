import { Context } from '@nuxt/types'
export default function ({ store, redirect }: Context) {
  const isSuperUser = store.state.recipe.isAdmin
  if (!isSuperUser) {
    return redirect('/')
  }
}
