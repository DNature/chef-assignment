<template>
  <c-box max-w="50vw" mx="auto">
    <c-heading mb="4">{{ getOneRecipe.name }}</c-heading>
    <p>{{ getOneRecipe.description }}</p>

    <c-box mt="12">
      <c-checkbox-group variant-color="green">
        <c-checkbox v-for="i in ingredients" :key="i" :value="i">{{
          i
        }}</c-checkbox>
      </c-checkbox-group>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import Vue from 'vue'
import Queries from '~/apollo/queries'

export default Vue.extend({
  name: 'Recipe',
  layout: 'main',
  middleware: 'auth',
  data() {
    return {
      getOneRecipe: {},
    }
  },
  apollo: {
    getOneRecipe: {
      query: Queries.GetOneRecipe,
      variables() {
        return {
          id: parseInt(this.$route.params.id),
        }
      },
    },
  },
  computed: {
    ingredients() {
      if ((this.getOneRecipe as any).name) {
        const ingredients = this.$data.getOneRecipe.ingredients.split(',')
        return ingredients
      } else {
        return []
      }
    },
  },
  watch: {},
})
</script>

<style scoped>
.card {
  box-shadow: 0px 0px 20px 5px rgba(20, 72, 98, 0.05);
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  border: 1px solid #dadada;
}

.card:hover {
  box-shadow: 0px 0px 38.4444px 12.8148px rgba(20, 72, 98, 0.1);
  border: none;
}
p {
  font-size: 1.2rem;
}
</style>
