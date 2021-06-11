<template>
  <div>
    <c-stack max-w="30rem" mx="auto" as="form" :spacing="6" mb="6">
      <c-alert v-if="error.length" status="error">
        <c-alert-icon />
        <c-alert-description>{{ error }}</c-alert-description>
      </c-alert>
      <c-input v-model="name" placeholder="Recipe name" />
      <c-input v-model="description" placeholder="Description (250 chars)" />
      <c-input
        v-model="ingredients"
        placeholder="Ingredients. Seperated with comma (,)"
      />
      <c-select v-model="category" placeholder="Select category">
        <option v-for="c in categories" :key="c.id" :value="c.name">
          {{ c.name }}
        </option>
      </c-select>
      <c-button variant-color="blue" @click.prevent="create">
        Create recipe
      </c-button>
    </c-stack>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'main',
  middleware: ['auth', 'admin'],
  data() {
    return {
      name: '',
      description: '',
      ingredients: '',
      category: '',
      error: '',
    }
  },
  computed: {
    categories() {
      return this.$store.state.recipe.categories
    },
  },
  created() {
    this.$store.dispatch('recipe/getCategories')
  },
  methods: {
    create() {
      const data = {
        name: this.name,
        description: this.description,
        ingredients: this.ingredients,
        categoryName: this.category,
      }
      if (
        !this.category.length ||
        !this.description.length ||
        !this.ingredients.length ||
        !this.name.length
      ) {
        this.error = 'Please fill out the entire form'
      } else {
        this.$store
          .dispatch('recipe/create', data)
          .then(() => this.$router.push('/recipes'))
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
