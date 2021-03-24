<template>
  <div class="login-wrapper">
    <admin-login />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminLogin from '@/components/admin/login.vue'

export default Vue.extend({
  components: {
    AdminLogin
  },
});
</script>

<style lang="scss" scoped>
@import "@/sass/_mixins.scss";

@include login-wrapper();

</style>