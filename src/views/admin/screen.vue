<template>
  <div>
    <admin-screen />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AdminScreen from '@/components/admin/screen.vue'

export default Vue.extend({
  components: {
    AdminScreen
  }
})
</script>

<style lang="scss" scoped>
div {
  width: 100%;
}
</style>