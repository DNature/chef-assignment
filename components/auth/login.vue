<template>
  <div>
    <c-link v-if="!isLoggedIn" as="nuxt-link" to="/login">
      <c-button color="black" variant="outline"> Sign in </c-button>
    </c-link>
    <c-button v-if="isLoggedIn" color="black" variant="solid" @click="logout">
      Logout</c-button
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    isLoggedIn() {
      this.$store.dispatch('recipe/loggedIn')
      return this.$store.state.recipe.isLoggedIn
    },
  },
  methods: {
    async logout() {
      // @ts-ignore
      await this.$apolloHelpers.onLogout()
      this.$store.dispatch('recipe/loggedIn')
      this.$store.dispatch('recipe/setUser', {})
      this.$router.push('/login')
    },
  },
})
</script>
