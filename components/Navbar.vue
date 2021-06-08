<template>
  <c-stack
    is-inline
    justify-content="space-between"
    p="12"
    align-items="center"
  >
    <c-stack :spacing="12" is-inline>
      <c-box>
        <c-heading size="md">Foodie</c-heading>
      </c-box>
      <c-stack is-inline :spacing="6" align-items="center" d="flex">
        <c-link as="nuxt-link" to="/"> Home </c-link>
        <c-link as="nuxt-link" to="/recipes"> Recipe </c-link>
      </c-stack>
    </c-stack>

    <Login />
  </c-stack>
</template>

<script lang="ts">
import Vue from 'vue'
import Login from '@/components/auth/login.vue'

export default Vue.extend({
  name: 'Navbar',
  components: {
    Login,
  },
})
</script>
