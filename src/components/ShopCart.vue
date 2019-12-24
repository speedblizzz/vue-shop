<template>
  <div class="shop-cart">
    <b-button @click="showModal = true" variant="outline-success"
      >Cart ({{ cartProductsCount }})</b-button
    >
    <b-modal
      id="cart-modal"
      title="Cart"
      size="lg"
      v-model="showModal"
      centered
      scrollable
    >
      <span v-if="isCartDisabled">Cart is empty</span>
      <b-list-group>
        <b-list-group-item v-for="product in cart" :key="product.id">
          <b-container>
            <b-row>
              <b-col cols="2" class="shop-cart__col"
                ><b-img
                  class="shop-cart__img"
                  :src="`./images/${product.cover}.png`"
                ></b-img> </b-col
              ><b-col cols="4" class="shop-cart__col">
                <span>{{ product.name }}</span></b-col
              ><b-col cols="2" class="shop-cart__col">
                <b-form-input
                  :id="`quantity-${product.id}`"
                  class="shop-cart__input"
                  type="number"
                  :value="product.quantity"
                  @input="updateQuantity(product, $event)"
                  min="1"
                  max="1000"
                  step="1"
                  size="sm"
                ></b-form-input></b-col
              ><b-col cols="3" class="shop-cart__col">
                <span class="text-center">{{ product.sum }} RUB</span></b-col
              ><b-col cols="1" class="shop-cart__col">
                <b-button
                  @click="deleteProductFromCart(product.id)"
                  variant="danger"
                  title="Delete from cart"
                  >X</b-button
                >
              </b-col></b-row
            >
          </b-container>
        </b-list-group-item>
      </b-list-group>

      <template v-slot:modal-footer>
        <div
          class="shop-cart__modal-footer d-flex align-items-center justify-content-between"
        >
          <b-button
            @click="printCart"
            :disabled="isCartDisabled"
            variant="primary"
            >Print</b-button
          >
          <b-button
            variant="success"
            :disabled="isCartDisabled"
            @click="createOrder"
          >
            Checkout
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapState(['cart']),
    cartProductsCount() {
      return this.cart.length
    },

    isCartDisabled() {
      return this.cartProductsCount === 0
    }
  },
  methods: {
    ...mapMutations(['UPDATE_CART', 'CLEAR_CART', 'DELETE_PRODUCT_FROM_CART']),
    createOrder() {
      if (this.isCartDisabled) {
        console.log('cart is empty')
        return
      }
      console.log('order is created')
      this.showModal = false
      this.CLEAR_CART()
    },
    updateQuantity(product, newQuantity) {
      if (!+newQuantity) return
      let quantity = +newQuantity || 1
      const newProduct = { ...product }
      newProduct.quantity = quantity
      newProduct.sum = quantity * newProduct.price
      this.UPDATE_CART(newProduct)
    },
    deleteProductFromCart(productId) {
      this.DELETE_PRODUCT_FROM_CART(productId)
    },
    printCart() {
      window.print()
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-cart {
  &__modal-footer {
    width: 100%;
  }
  &__img {
    display: block;
    width: 100%;
  }
  &__col {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__input {
    text-align: center;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
}
</style>
