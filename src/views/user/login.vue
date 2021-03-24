<template>
  <div class="login-wrapper">
    <user-login />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserLogin from '@/components/user/login.vue'

export default Vue.extend({
  components: {
    UserLogin
  }
})
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include login-wrapper();

</style>