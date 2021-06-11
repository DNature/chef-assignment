<template>
  <no-ssr>
    <div>
      <c-simple-grid
        :columns="3"
        mt="8"
        :spacing="4"
        max-w="40rem"
        align-items="center"
      >
        <c-input-group size="lg" grid-column-start="1" grid-column-end="3">
          <c-input-left-element opacity="0.4"
            ><fa icon="search"
          /></c-input-left-element>
          <c-input
            v-model="query"
            type="text"
            font-size="1rem"
            placeholder="Search"
            @change="searchRecipe"
          />
        </c-input-group>
        <c-select
          v-model="category"
          placeholder="Select Burger"
          @change="oneCategory"
        >
          <option v-for="c in categories" :key="c.id" :value="c.name">
            {{ c.name }}
          </option>
        </c-select>
      </c-simple-grid>
      <c-spinner v-if="recipes.loading" />
      <c-grid v-else template-columns="repeat(4, 1fr)" gap="6" mt="12">
        <c-link
          v-for="recipe in recipes"
          :key="recipe.id"
          as="nuxt-link"
          :to="`recipes/${recipe.id}`"
          class="card"
          p="4"
          border-radius="10px"
        >
          <h3>{{ recipe.name }}</h3>
          <p>{{ recipe.description.slice(0, 150) }}</p>
        </c-link>
      </c-grid>
    </div>
  </no-ssr>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'main',
  middleware: 'auth',
  data() {
    return {
      query: '',
      loading: this.$store.state.recipe.loading,
      category: '',
    }
  },
  computed: {
    recipes() {
      return this.$store.state.recipe.recipes
    },
    categories() {
      return this.$store.state.recipe.categories
    },
    // eslint-disable-next-line vue/return-in-computed-property
    searchRecipe() {
      const input = this.query
      if (input.length >= 2) {
        this.$store.dispatch('recipe/searchRecipe', input)
      } else {
        this.$store.dispatch('recipe/getRecipes')
      }
    },
  },
  created() {
    this.$store.dispatch('recipe/getCategories')
    this.$store.dispatch('recipe/getRecipes')
  },
  methods: {
    oneCategory() {
      if (this.category.length > 2) {
        this.$store.dispatch('recipe/oneCategory', this.category)
      } else {
        this.$store.dispatch('recipe/getRecipes')
      }
    },
  },
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

h3 {
  font-size: 1.5em;
  font-weight: 700;
}
</style>
