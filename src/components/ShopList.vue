<template>
  <main class="shop-list">
    <b-container>
      <b-row>
        <vue-glide v-if="products.length > 0" :perView="productsPerView" type="carousel" :gap="20">
          <vue-glide-slide v-for="product in products" :key="product.id">
            <router-link
              class="shop-list__link"
              :to="{ name: 'shopProduct', params: { id: product.id } }"
            >
              <b-card tag="article" class="text-center">
                <b-img
                  class="shop-list__img"
                  :src="`./images/${product.cover}.png`"
                ></b-img>
                <h4 class="shop-list__title">{{ product.name }}</h4>
                <b-card-text>{{ product.price }} RUB</b-card-text>
              </b-card>
            </router-link>
          </vue-glide-slide>
          <template v-if="showControlButtons" slot="control">
            <b-button
              class="shop-list__slider-btn shop-list__slider-btn--prev"
              data-glide-dir="<"
              variant="outline-primary"
              >&#8249;</b-button
            >
            <b-button
              class="shop-list__slider-btn shop-list__slider-btn--next"
              data-glide-dir=">"
              variant="outline-primary"
              >&#8250;</b-button
            >
          </template>
        </vue-glide>
        <p v-else>There are no products in shop</p>
      </b-row>
    </b-container>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(['cart']),
    showControlButtons() {
      return this.products.length > 3
    },
    productsPerView() {
      const productCount = this.products.length
      return productCount < 3 ? productCount : 3
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-list {
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid;
  }
  &__price {
    display: inline-block;
    margin-bottom: 10px;
  }
  &__link {
    display: block;
    max-height: 600px;
    color: #000;
    &:hover {
      text-decoration: none;
    }
  }
  &__img {
    display: block;
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
  }
  &__slider-btn {
    position: absolute;
    width: 45px;
    height: 40px;
    top: calc(50% - 20px);
    &--prev {
      left: -55px;
    }
    &--next {
      right: -55px;
    }
  }
}
</style>
