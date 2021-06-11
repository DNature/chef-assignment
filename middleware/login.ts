import { Context } from '@nuxt/types'
export default function ({ app, redirect }: Context) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (hasToken) {
    return redirect('/')
  }
}
