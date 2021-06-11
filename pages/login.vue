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
              autocomplete="on"
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
              autocomplete="on"
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

export default Vue.extend({
  middleware: 'login',
  data() {
    return {
      isOpen: false,
      email: '',
      password: '',
      name: '',
    }
  },
  computed: {
    isLoggedIn() {
      this.$store.dispatch('recipe/loggedIn')
      return this.$store.state.recipe.isLoggedIn
    },
  },
  methods: {
    login() {
      this.$store
        .dispatch('recipe/login', {
          email: this.email,
          password: this.password,
        })
        .then(() => this.$router.push('/'))
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
          // @ts-ignore
          await this.$apolloHelpers.onLogin(token)
          this.$store.dispatch('recipe/loggedIn')
        }
      }
    },
    async logout() {
      // @ts-ignore
      await this.$apolloHelpers.onLogout()
      this.$router.push('/login')
      this.$store.dispatch('recipe/loggedIn')
    },
  },
})
</script>
