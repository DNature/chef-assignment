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
const AUTHKEY = 'autorization'

export default Vue.extend({
  data() {
    return {
      isLoggedIn: false,
    }
  },
  async mounted() {
    // @ts-ignore
    const token = await this.$apolloHelpers.getToken()
    if (token) {
      this.isLoggedIn = true
    }
  },
  methods: {
    async logout() {
      localStorage.removeItem(AUTHKEY)
      // @ts-ignore
      await this.$apolloHelpers.getToken()
      this.$router.push('/login')
      this.isLoggedIn = false
    },
  },
})
</script>
