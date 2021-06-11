export default function ({ app, redirect }: any) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (hasToken) {
    return redirect('/')
  }
}
