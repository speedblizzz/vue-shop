<template>
  <div class="shop">
    <shop-header />
    <shop-list :products="products" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ShopHeader from '../components/ShopHeader'
import ShopList from '../components/ShopList'
export default {
  components: {
    ShopHeader,
    ShopList
  },
  computed: {
    ...mapState(['products'])
  },
  created() {
    this.getProductList()
  },
  methods: {
    ...mapActions(['getProductList'])
  }
}
</script>

<style lang="scss" scoped>
.shop {
  width: 1280px;
  height: 800px;
  margin: auto;
}
</style>
