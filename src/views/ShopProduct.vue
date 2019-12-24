<template>
  <div class="shop-product">
    <shop-header />
    <shop-product-card :product="selectedProduct" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ShopHeader from '../components/ShopHeader'
import ShopProductCard from '../components/ShopProductCard'

export default {
  components: {
    ShopHeader,
    ShopProductCard
  },
  computed: {
    ...mapState(['selectedProduct'])
  },
  created() {
    const productId = this.$route.params.id
    this.getSelectedProduct(productId)
  },
  methods: {
    ...mapActions(['getSelectedProduct'])
  }
}
</script>

<style lang="scss" scoped>
.shop-product {
  width: 1280px;
  height: 800px;
  margin: auto;
}
</style>
