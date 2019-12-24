<template>
  <main class="shop-card">
    <b-container>
      <b-row>
        <b-card class="w-100">
          <b-media>
            <template v-slot:aside>
              <b-img
                :src="`./images/${product.cover}.png`"
                fluid
                alt="Product image"
              ></b-img>
            </template>
            <h5 class="mt-0">{{ product.name }}</h5>
            <p>
              {{ product.description }}
            </p>
            <p>{{ product.price }} RUB</p>
            <b-button
              v-if="!isAddedToCart"
              @click="addProductToCart(product.id)"
              variant="primary"
              >Add to cart</b-button
            >
            <b-button @click="openCart" v-else variant="success"
              >Go to cart</b-button
            >
          </b-media>
        </b-card>
      </b-row>
    </b-container>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    ...mapState(['cart']),
    isAddedToCart() {
      const productId = this.product.id
      return this.cart.find(product => product.id === productId)
    }
  },
  methods: {
    ...mapActions(['addProductToCart']),
    openCart() {
      this.$bvModal.show('cart-modal')
    }
  }
}
</script>

<style scoped></style>
