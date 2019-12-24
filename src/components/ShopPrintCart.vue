<template>
  <div class="print-table">
    <h2>Cart</h2>
    <b-table striped hover :items="tableCart"></b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['cart']),
    tableCart() {
      return this.cart.map(product => {
        return {
          name: product.name,
          description: product.description,
          quantity: product.quantity,
          total: `${product.sum} RUB`
        }
      })
    }
  }
}
</script>

<style scoped></style>
