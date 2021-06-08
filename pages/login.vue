<template>
  <c-box :w="['90vw', '70vw', '40vw']" mx="auto">
    <c-tabs>
      <c-tab-list>
        <c-tab>Register</c-tab>
        <c-tab>Login</c-tab>
      </c-tab-list>
      <c-tab-panels mt="6">
        <c-tab-panel>
          <c-stack as="form" :spacing="6" mb="6">
            <c-input v-model="name" placeholder="Name" />
            <c-input v-model="email" placeholder="Email" type="email" />
            <c-input
              v-model="password"
              placeholder="Password"
              type="password"
            />
            <c-button variant-color="blue" @click="register"> Submit </c-button>
          </c-stack>
        </c-tab-panel>
        <c-tab-panel>
          <c-stack as="form" :spacing="6" mb="6">
            <c-input v-model="email" placeholder="Email" type="email" />
            <c-input
              v-model="password"
              placeholder="Password"
              type="password"
            />
            <c-button variant-color="blue" @click="login"> Login </c-button>
          </c-stack>
        </c-tab-panel>
      </c-tab-panels>
    </c-tabs>
  </c-box>
</template>

<script lang="ts">
import Vue from 'vue'
import Mutations from '@/apollo/mutations'
const AUTHKEY = 'autorization'

export default Vue.extend({
  data() {
    return {
      isOpen: false,
      email: '',
      password: '',
      name: '',
      isLoggedIn: false,
    }
  },
  mounted() {
    if (localStorage.getItem(AUTHKEY)) {
      this.isLoggedIn = true
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    async login() {
      const {
        data: {
          login: { token },
        },
      } = await this.$apollo.mutate({
        mutation: Mutations.Login,
        variables: {
          email: this.email,
          password: this.password,
        },
      })
      if (token) {
        // localStorage.setItem(AUTHKEY, `Bearer ${token}`)
        // @ts-ignore
        await this.$apolloHelpers.onLogin(token)
        this.isLoggedIn = true
        this.$router.push('/')
      }
    },

    async register() {
      const {
        data: { errors },
      } = await this.$apollo.mutate({
        mutation: Mutations.Register,
        variables: {
          email: this.email,
          password: this.password,
          name: this.name,
        },
      })

      if (!errors) {
        const {
          data: {
            login: { token },
          },
        } = await this.$apollo.mutate({
          mutation: Mutations.Login,
          variables: {
            email: this.email,
            password: this.password,
          },
        })
        if (token) {
          // localStorage.setItem(AUTHKEY, `Bearer ${token}`)
          // @ts-ignore
          await this.$apolloHelpers.onLogin(token)
          this.isLoggedIn = true
        }
      }
    },
    async logout() {
      localStorage.removeItem(AUTHKEY)
      // @ts-ignore
      await this.$apolloHelpers.onLogout()
      this.$router.push('/login')
      this.isLoggedIn = false
    },
  },
})
</script>
