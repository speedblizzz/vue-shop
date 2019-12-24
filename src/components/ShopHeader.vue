<template>
  <header class="shop-header">
    <b-container>
      <b-row>
        <b-col cols="8">
          <h1>
            <router-link :to="{ name: 'shop' }" class="shop-header__logo-link"
              >Vue Shop</router-link
            >
          </h1>
        </b-col>
        <b-col cols="4" class="d-flex align-items-center justify-content-end">
          <shop-cart />
        </b-col>
      </b-row>
    </b-container>
    <shop-print-cart />
  </header>
</template>

<script>
import ShopCart from '../components/ShopCart'
import ShopPrintCart from '../components/ShopPrintCart'
export default {
  components: {
    ShopCart,
    ShopPrintCart
  }
}
</script>

<style lang="scss" scoped>
.shop-header {
  padding: 30px 0;
  &__logo-link {
    color: #000;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>
