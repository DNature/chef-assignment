<template>
  <c-box pt="3rem">
    <c-grid template-columns="repeat(2, 1fr)" gap="18">
      <c-box pr="12">
        <c-heading
          class="gradient-text"
          :font-size="['2rem', '3rem', '4rem', '5rem']"
          >Eat today</c-heading
        >
        <c-heading
          :font-size="['2rem', '2.5rem', '3rem', '4rem']"
          as="h2"
          font-weight="500"
          >Live another day</c-heading
        >
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id
          distinctio recusandae incidunt reiciendis sequi, sapiente optio
          aperiam? Mollitia fugiat, dolorum.
        </p>
        <c-input-group size="lg" mt="8">
          <c-input-left-element opacity="0.4"
            ><fa icon="search"
          /></c-input-left-element>
          <c-input type="text" font-size="1rem" placeholder="Search" />
        </c-input-group>
      </c-box>
      <c-box>
        <c-image
          object-fit="cover"
          src="/images/piada-italian.png"
          alt="Foodie"
        />
      </c-box>
    </c-grid>
  </c-box>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  data() {
    return {
      isOpen: false,
      getCategories: null,
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900',
        },
        light: {
          bg: 'white',
          color: 'gray.900',
        },
      },
    }
  },
})
</script>

<style>
h1,
h2,
h3,
h4,
h5,
p {
  color: #144862;
}

.gradient-text {
  background: linear-gradient(134.81deg, #ffa73f 1.57%, #ff6636 102.39%);
  background-clip: text;
  color: transparent;
}

input[type='text'] {
  background: #f4f4f4;
  border: 1px solid #dadada;
  border-radius: 10px;
}
</style>
